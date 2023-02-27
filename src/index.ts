/**
 * @since 1.0.0
 */
import * as _api from "@opentelemetry/api"

import * as Context from "@effect/data/Context"
import * as Cause from "@effect/io/Cause"
import * as Debug from "@effect/io/Debug"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"

type _Api = typeof _api

/**
 * @since 1.0.0
 */
export interface Api extends _Api {}

/**
 * @since 1.0.0
 */
export interface Tracer extends _api.Tracer {}

/**
 * @since 1.0.0
 */
export interface Span extends _api.Span {}

/**
 * @since 1.0.0
 */
export interface SpanOptions extends _api.SpanOptions {}

/**
 * @since 1.0.0
 */
export const currentApiTag = Context.Tag<Api>("@effect/opentelemetry/currentApiTag")

/**
 * @since 1.0.0
 */
export const currentTracerTag = Context.Tag<Tracer>("@effect/opentelemetry/currentTracerTag")

/**
 * @since 1.0.0
 */
export const currentSpanTag = Context.Tag<Span>("@effect/opentelemetry/currentSpanTag")

/**
 * @since 1.0.0
 */
export const currentSpan = Effect.contextWith(
  (ctx: Context.Context<never>) => Context.getOption(ctx, currentSpanTag)
)

/**
 * @since 1.0.0
 */
export const currentTracer = Effect.contextWith(
  (ctx: Context.Context<never>) => Context.getOption(ctx, currentTracerTag)
)

/**
 * @since 1.0.0
 */
export const currentApi = Effect.contextWith(
  (ctx: Context.Context<never>) => Context.getOption(ctx, currentApiTag)
)

/**
 * @since 1.0.0
 */
export const withSpan: {
  (name: string, options?: SpanOptions): <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
  <R, E, A>(self: Effect.Effect<R, E, A>, name: string, options?: SpanOptions): Effect.Effect<R, E, A>
} = Debug.dualWithTrace<
  (name: string, options?: SpanOptions) => <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(self: Effect.Effect<R, E, A>, name: string, options?: SpanOptions) => Effect.Effect<R, E, A>
>(
  (args) => typeof args[0] !== "string",
  (trace) =>
    (self, name, options) =>
      Effect.contextWithEffect((ctx: Context.Context<never>) => {
        const maybeApi = Context.getOption(ctx, currentApiTag)
        const maybeTracer = Context.getOption(ctx, currentTracerTag)
        const maybeParent = Context.getOption(ctx, currentSpanTag)
        return maybeApi._tag === "None" || maybeTracer._tag === "None" ?
          self :
          Effect.acquireUseRelease(
            Effect.sync(() => {
              const active = maybeApi.value.context.active()
              if (maybeParent._tag === "Some") {
                const context = maybeApi.value.trace.setSpan(active, maybeParent.value)
                return maybeTracer.value.startSpan(name, options, context)
              }
              return maybeTracer.value.startSpan(name, options, active)
            }),
            (span) => Effect.provideService(currentSpanTag, span)(self),
            (span, exit) =>
              Effect.sync(() => {
                if (exit._tag === "Success") {
                  span.setStatus({
                    code: maybeApi.value.SpanStatusCode.OK
                  })
                } else {
                  if (Cause.isInterruptedOnly(exit.cause)) {
                    span.setStatus({
                      code: maybeApi.value.SpanStatusCode.OK
                    })
                  } else {
                    span.setStatus({
                      code: maybeApi.value.SpanStatusCode.ERROR,
                      message: Cause.pretty(exit.cause)
                    })
                  }
                }
                span.end()
              })
          )
      }).traced(trace)
)

/**
 * @since 1.0.0
 */
export const Api = Layer.sync(currentApiTag, () => _api)

/**
 * @since 1.0.0
 */
export const Tracer = (name: string, version?: string) =>
  Layer.provideMerge(
    Api,
    Layer.effect(currentTracerTag, Effect.serviceWith(currentApiTag, (api) => api.trace.getTracer(name, version)))
  )
