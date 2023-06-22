import { millis, seconds } from "@effect/data/Duration"
import { pipe } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as Metric from "@effect/io/Metric"
import * as OtelMetrics from "@effect/opentelemetry/Metrics"
import * as Resource from "@effect/opentelemetry/Resource"
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus"

const counter = Metric.taggedWithLabels(
  Metric.counter("count", "An example counter"),
  [
    OtelMetrics.integerLabel,
    OtelMetrics.incrementalOnlyLabel
  ]
)

const incrementCounter = pipe(
  Metric.increment(counter),
  Effect.delay(seconds(1)),
  Effect.forever
)

const timer = Metric.timer("timer")

const timerLoop = pipe(
  Effect.randomWith((_) => _.nextRange(1, 100)),
  Effect.flatMap((_) => Effect.sleep(millis(_))),
  Metric.trackDuration(timer),
  Effect.forever
)

const program = Effect.gen(function*(_) {
  yield* _(Effect.fork(incrementCounter))
  yield* _(Effect.fork(timerLoop))
})

const MetricsLive = Layer.provide(
  Resource.layer({ serviceName: "example" }),
  OtelMetrics.layer(new PrometheusExporter({ port: 9464 }))
)

pipe(
  program,
  Effect.awaitAllChildren,
  Effect.provideLayer(MetricsLive),
  Effect.catchAllCause(Effect.logErrorCause),
  Effect.runFork
)
