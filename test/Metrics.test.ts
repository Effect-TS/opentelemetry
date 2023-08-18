import * as Effect from "@effect/io/Effect"
import { disableRuntimeMetrics } from "@effect/io/Fiber/Runtime/Flags"
import * as Metric from "@effect/io/Metric"
import * as internal from "@effect/opentelemetry/internal/metrics"
import * as Metrics from "@effect/opentelemetry/Metrics"
import { ValueType } from "@opentelemetry/api"
import { Resource } from "@opentelemetry/resources"

describe("Metrics", () => {
  it("gauge", () =>
    Effect.gen(function*(_) {
      const runtime = yield* _(Effect.runtime<never>())
      const producer = new internal.MetricProducerImpl(
        runtime,
        new Resource({
          name: "test",
          version: "1.0.0"
        })
      )
      const gauge = Metric.taggedWithLabels(Metric.gauge("rps"), [
        Metrics.integerLabel,
        Metrics.unitLabel("requests")
      ])

      yield* _(Metric.set(gauge, 10), Effect.tagMetrics("key", "value"))

      const results = yield* _(Effect.promise(() => producer.collect()))
      const object = JSON.parse(JSON.stringify(results))
      assert.deepEqual(object.resourceMetrics.resource._attributes, {
        "name": "test",
        "version": "1.0.0"
      })
      assert.equal(object.resourceMetrics.scopeMetrics.length, 1)
      assert.deepEqual(object.resourceMetrics.scopeMetrics[0].metrics.find((_: any) => _.descriptor.name === "rps"), {
        "dataPointType": 2,
        "descriptor": {
          "name": "rps",
          "description": "",
          "unit": "requests",
          "type": "OBSERVABLE_GAUGE",
          "valueType": ValueType.INT
        },
        "aggregationTemporality": 1,
        "dataPoints": [
          {
            "startTime": results.resourceMetrics.scopeMetrics[0].metrics[0].dataPoints[0].startTime,
            "endTime": results.resourceMetrics.scopeMetrics[0].metrics[0].dataPoints[0].endTime,
            "attributes": {
              "key": "value"
            },
            "value": 10
          }
        ]
      })
    }).pipe(
      Effect.provideLayer(disableRuntimeMetrics),
      Effect.runPromise
    ))
})
