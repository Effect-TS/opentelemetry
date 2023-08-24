/**
 * @since 1.0.0
 */
import type { LazyArg } from "@effect/data/Function"
import type * as Effect from "@effect/io/Effect"
import type { Layer } from "@effect/io/Layer"
import type { MetricLabel } from "@effect/io/Metric/Label"
import type * as Scope from "@effect/io/Scope"
import * as internal from "@effect/opentelemetry/internal/metrics"
import type { Resource } from "@effect/opentelemetry/Resource"
import type { MetricReader } from "@opentelemetry/sdk-metrics"
import type { MetricProducer } from "@opentelemetry/sdk-metrics/build/src/export/MetricProducer"

/**
 * @since 1.0.0
 * @category labels
 */
export const aggregationTemporalityLabel: (value: "delta" | "cumulative") => MetricLabel =
  internal.aggregationTemporalityLabel

/**
 * @since 1.0.0
 * @category labels
 */
export const incrementalOnlyLabel: MetricLabel = internal.incrementalOnlyLabel

/**
 * @since 1.0.0
 * @category labels
 */
export const integerLabel: MetricLabel = internal.integerLabel

/**
 * @since 1.0.0
 * @category labels
 */
export const unitLabel: (unit: string) => MetricLabel = internal.unitLabel

/**
 * @since 1.0.0
 * @category producer
 */
export const makeProducer: Effect.Effect<Resource, never, MetricProducer> = internal.makeProducer

/**
 * @since 1.0.0
 * @category producer
 */
export const registerProducer: (
  self: MetricProducer,
  metricReader: LazyArg<MetricReader>
) => Effect.Effect<Scope.Scope, never, MetricReader> = internal.registerProducer

/**
 * @since 1.0.0
 * @category layers
 */
export const layer: (evaluate: LazyArg<MetricReader>) => Layer<Resource, never, never> = internal.layer
