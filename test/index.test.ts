import * as Effect from "@effect/io/Effect"
import * as Tracer from "@effect/io/Tracer"
import { OtelSpan } from "@effect/opentelemetry/internal_effect_untraced/tracer"
import * as it from "@effect/opentelemetry/test/utils/extend"
import * as Otel from "@effect/opentelemetry/Tracer"

const TracerLive = Otel.layer({
  name: "test-tracer"
})

describe("Tracer", () => {
  describe("provided", () => {
    it.effect("withSpan", () =>
      Effect.provideSomeLayer(TracerLive)(
        Tracer.withSpan("ok")(
          Effect.gen(function*(_) {
            const span = yield* _(Tracer.Span)
            expect(span).instanceOf(OtelSpan)
          })
        )
      ))
  })
  describe("not provided", () => {
    it.effect("withSpan", () =>
      Tracer.withSpan("ok")(
        Effect.gen(function*(_) {
          const span = yield* _(Tracer.Span)
          expect(span).not.instanceOf(OtelSpan)
        })
      ))
  })
})
