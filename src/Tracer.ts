/**
 * @since 1.0.0
 */
import * as internal from "@effect/opentelemetry/internal_effect_untraced/tracer"

/**
 * @since 1.0.0
 * @category models
 */
export interface TracerOptions {
  readonly name: string
  readonly version?: string
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const make = internal.make

/**
 * @since 1.0.0
 * @category layers
 */
export const layer = internal.layer
