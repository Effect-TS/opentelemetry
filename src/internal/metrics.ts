import type { LazyArg } from "@effect/data/Function"
import * as HashSet from "@effect/data/HashSet"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as Metric from "@effect/io/Metric"
import type * as MetricKey from "@effect/io/Metric/Key"
import * as MetricKeyType from "@effect/io/Metric/KeyType"
import * as MetricLabel from "@effect/io/Metric/Label"
import * as MetricState from "@effect/io/Metric/State"
import type * as Runtime from "@effect/io/Runtime"
import * as Resource from "@effect/opentelemetry/Resource"
import type { HrTime } from "@opentelemetry/api"
import { ValueType } from "@opentelemetry/api"
import type * as Resources from "@opentelemetry/resources"
import type {
  CollectionResult,
  DataPoint,
  InstrumentDescriptor,
  MetricData,
  MetricReader
} from "@opentelemetry/sdk-metrics"
import { AggregationTemporality, DataPointType, InstrumentType } from "@opentelemetry/sdk-metrics"
import type { MetricCollectOptions, MetricProducer } from "@opentelemetry/sdk-metrics/build/src/export/MetricProducer"

const sdkName = "@effect/opentelemetry/Metrics"

const aggregationTemporalityLabelKey = `${sdkName}/aggregationTemporality`

/** @internal */
export const aggregationTemporalityLabel = (value: "delta" | "cumulative") =>
  MetricLabel.make(
    aggregationTemporalityLabelKey,
    value
  )

const incrementalOnlyLabelKey = `${sdkName}/isIncrementalOnly`

/** @internal */
export const incrementalOnlyLabel = MetricLabel.make(
  incrementalOnlyLabelKey,
  "true"
)

const integerLabelKey = `${sdkName}/isInteger`

/** @internal */
export const integerLabel = MetricLabel.make(
  integerLabelKey,
  "true"
)

const unitLabelKey = `${sdkName}/unit`

/** @internal */
export const unitLabel = (unit: string) =>
  MetricLabel.make(
    unitLabelKey,
    unit
  )

/** @internal */
export class MetricProducerImpl implements MetricProducer {
  constructor(
    readonly runtime: Runtime.Runtime<never>,
    readonly resource: Resources.Resource
  ) {
  }

  collect(_options?: MetricCollectOptions): Promise<CollectionResult> {
    const snapshot = Metric.unsafeSnapshot()
    const hrTimeNow = currentHrTime()
    const metricData: Array<MetricData> = []

    for (const { metricKey, metricState } of snapshot) {
      const tags = HashSet.reduce(metricKey.tags, {}, (acc: Record<string, string>, label) => {
        acc[label.key] = label.value
        return acc
      })
      const attributes = Object.fromEntries(
        Object.entries(tags).filter(([key]) => !key.startsWith(sdkName))
      )
      const isDelta = tags[aggregationTemporalityLabelKey] === "delta"
      const descriptor = descriptorFromKey(metricKey, tags)

      if (MetricState.isCounterState(metricState)) {
        metricData.push({
          dataPointType: DataPointType.SUM,
          descriptor,
          isMonotonic: descriptor.type === InstrumentType.COUNTER,
          aggregationTemporality: isDelta ? AggregationTemporality.DELTA : AggregationTemporality.CUMULATIVE,
          dataPoints: [{
            startTime: hrTimeNow,
            endTime: hrTimeNow,
            attributes,
            value: metricState.count
          }]
        })
      } else if (MetricState.isGaugeState(metricState)) {
        metricData.push({
          dataPointType: DataPointType.GAUGE,
          descriptor,
          aggregationTemporality: isDelta ? AggregationTemporality.DELTA : AggregationTemporality.CUMULATIVE,
          dataPoints: [{
            startTime: hrTimeNow,
            endTime: hrTimeNow,
            attributes,
            value: metricState.value
          }]
        })
      } else if (MetricState.isHistogramState(metricState)) {
        const size = metricState.buckets.length
        const buckets = {
          boundaries: Array<number>(size - 1),
          counts: Array<number>(size)
        }
        let i = 0
        let prev = 0
        for (const [boundary, value] of metricState.buckets) {
          if (i < size - 1) {
            buckets.boundaries[i] = boundary
          }
          buckets.counts[i] = value - prev
          prev = value
          i++
        }

        metricData.push({
          dataPointType: DataPointType.HISTOGRAM,
          descriptor,
          aggregationTemporality: AggregationTemporality.CUMULATIVE,
          dataPoints: [{
            startTime: hrTimeNow,
            endTime: hrTimeNow,
            attributes,
            value: {
              buckets,
              count: metricState.count,
              min: metricState.min,
              max: metricState.max,
              sum: metricState.sum
            }
          }]
        })
      } else if (MetricState.isFrequencyState(metricState)) {
        const dataPoints: Array<DataPoint<number>> = []
        for (const [freqKey, value] of metricState.occurrences) {
          dataPoints.push({
            startTime: hrTimeNow,
            endTime: hrTimeNow,
            attributes: {
              ...attributes,
              key: freqKey
            },
            value
          })
        }
        metricData.push({
          dataPointType: DataPointType.SUM,
          descriptor: descriptorFromKey(metricKey, tags),
          aggregationTemporality: AggregationTemporality.CUMULATIVE,
          isMonotonic: true,
          dataPoints
        })
      } else if (MetricState.isSummaryState(metricState)) {
        const dataPoints: Array<DataPoint<number>> = [{
          startTime: hrTimeNow,
          endTime: hrTimeNow,
          attributes: { ...attributes, quantile: "min" },
          value: metricState.min
        }]
        for (const [quantile, value] of metricState.quantiles) {
          dataPoints.push({
            startTime: hrTimeNow,
            endTime: hrTimeNow,
            attributes: { ...attributes, quantile: quantile.toString() },
            value: value._tag === "Some" ? value.value : 0
          })
        }
        dataPoints.push({
          startTime: hrTimeNow,
          endTime: hrTimeNow,
          attributes: { ...attributes, quantile: "max" },
          value: metricState.max
        })

        metricData.push({
          dataPointType: DataPointType.SUM,
          descriptor: descriptorFromKey(metricKey, tags, "quantiles"),
          aggregationTemporality: AggregationTemporality.CUMULATIVE,
          isMonotonic: false,
          dataPoints
        })
        metricData.push({
          dataPointType: DataPointType.SUM,
          descriptor: {
            ...descriptorMeta(metricKey, "count"),
            unit: "1",
            type: InstrumentType.COUNTER,
            valueType: ValueType.INT
          },
          aggregationTemporality: AggregationTemporality.CUMULATIVE,
          isMonotonic: true,
          dataPoints: [{
            startTime: hrTimeNow,
            endTime: hrTimeNow,
            attributes,
            value: metricState.count
          }]
        })
        metricData.push({
          dataPointType: DataPointType.SUM,
          descriptor: {
            ...descriptorMeta(metricKey, "sum"),
            unit: "1",
            type: InstrumentType.COUNTER,
            valueType: ValueType.DOUBLE
          },
          aggregationTemporality: AggregationTemporality.CUMULATIVE,
          isMonotonic: true,
          dataPoints: [{
            startTime: hrTimeNow,
            endTime: hrTimeNow,
            attributes,
            value: metricState.sum
          }]
        })
      }
    }

    return Promise.resolve({
      resourceMetrics: {
        resource: this.resource,
        scopeMetrics: [{
          scope: { name: sdkName },
          metrics: metricData
        }]
      },
      errors: []
    })
  }
}

const descriptorMeta = (
  metricKey: MetricKey.MetricKey.Untyped,
  suffix?: string
) => ({
  name: suffix ? `${metricKey.name}_${suffix}` : metricKey.name,
  description: Option.getOrElse(metricKey.description, () => "")
})

const descriptorFromKey = (
  metricKey: MetricKey.MetricKey.Untyped,
  tags: Record<string, string>,
  suffix?: string
): InstrumentDescriptor => ({
  ...descriptorMeta(metricKey, suffix),
  unit: tags[unitLabelKey] ?? tags.unit ?? tags.time_unit ?? "1",
  type: instrumentTypeFromKey(metricKey, tags),
  valueType: valueTypeFromKey(metricKey, tags)
})

const instrumentTypeFromKey = (key: MetricKey.MetricKey.Untyped, tags: Record<string, string>): InstrumentType => {
  if (MetricKeyType.isHistogramKey(key.keyType)) {
    return InstrumentType.HISTOGRAM
  } else if (MetricKeyType.isGaugeKey(key.keyType)) {
    return InstrumentType.OBSERVABLE_GAUGE
  } else if (MetricKeyType.isSummaryKey(key.keyType)) {
    return InstrumentType.UP_DOWN_COUNTER
  } else if (MetricKeyType.isFrequencyKey(key.keyType)) {
    return InstrumentType.COUNTER
  }

  return tags[incrementalOnlyLabelKey] ?
    InstrumentType.COUNTER :
    InstrumentType.UP_DOWN_COUNTER
}

const valueTypeFromKey = (_key: MetricKey.MetricKey.Untyped, tags: Record<string, string>): ValueType => {
  if (tags[integerLabelKey]) {
    return ValueType.INT
  }

  return ValueType.DOUBLE
}

const currentHrTime = (): HrTime => {
  const now = Date.now()
  return [Math.floor(now / 1000), (now % 1000) * 1000000]
}

/** @internal */
const register = (evaluate: LazyArg<MetricReader>) =>
  Effect.acquireRelease(
    Effect.flatMap(
      Resource.Resource,
      (resource) =>
        Effect.flatMap(
          Effect.runtime<never>(),
          (runtime) =>
            Effect.sync(() => {
              const reader = evaluate()
              reader.setMetricProducer(new MetricProducerImpl(runtime, resource))
              return reader
            })
        )
    ),
    (reader) => Effect.promise(() => reader.shutdown())
  )

/** @internal */
export const layer = (reader: LazyArg<MetricReader>) => Layer.scopedDiscard(register(reader))
