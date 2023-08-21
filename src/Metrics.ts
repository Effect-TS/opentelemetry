import type { LazyArg } from "@effect/data/Function"
import type { Layer } from "@effect/io/Layer"
import type { MetricLabel } from "@effect/io/Metric/Label"
import * as internal from "@effect/opentelemetry/internal/metrics"
import type { Resource } from "@effect/opentelemetry/Resource"
import type { MetricReader } from "@opentelemetry/sdk-metrics"

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
 * @category layers
 */
export const layer: (reader: LazyArg<MetricReader>) => Layer<Resource, never, never> = internal.layer
