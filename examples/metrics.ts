import * as Chunk from "@effect/data/Chunk"
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
  Effect.randomWith((_) => _.nextRange(1, 1000)),
  Effect.flatMap((_) => Effect.sleep(millis(_))),
  Metric.trackDuration(timer),
  Effect.forever
)

const freq = Metric.frequency("freq")
const labels = [
  "cake",
  "pie",
  "cookie",
  "brownie",
  "muffin"
]
Effect.all([], { mode: "either" })

const freqLoop = Effect.randomWith((_) => _.nextIntBetween(0, labels.length)).pipe(
  Effect.flatMap((_) => Metric.update(freq, labels[_])),
  Effect.zipRight(Effect.sleep("1 seconds")),
  Effect.forever
)

const summary = Metric.summary({
  name: "summary",
  maxAge: "1 days",
  maxSize: 1000,
  error: 0.01,
  quantiles: Chunk.make(0.1, 0.5, 0.9)
})

const summaryLoop = Effect.randomWith((_) => _.nextRange(100, 1000)).pipe(
  Metric.trackSuccess(summary),
  Effect.zipRight(Effect.sleep("10 millis")),
  Effect.forever
)

const spawner = Effect.randomWith((_) => _.nextIntBetween(500, 1500)).pipe(
  Effect.flatMap((_) => Effect.fork(Effect.sleep(_))),
  Effect.flatMap((_) => _.await()),
  Effect.forever
)

const program = Effect.gen(function*(_) {
  yield* _(Effect.fork(incrementCounter))
  yield* _(Effect.fork(timerLoop))
  yield* _(Effect.fork(freqLoop))
  yield* _(Effect.fork(summaryLoop))
  yield* _(Effect.fork(spawner))
})

const MetricsLive = Layer.provide(
  Resource.layer({ serviceName: "example" }),
  OtelMetrics.layer(() => new PrometheusExporter({ port: 9464 }))
)

pipe(
  program,
  Effect.awaitAllChildren,
  Effect.provideLayer(MetricsLive),
  Effect.catchAllCause(Effect.logError),
  Effect.runFork
)
