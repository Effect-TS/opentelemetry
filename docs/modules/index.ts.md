---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Api (type alias)](#api-type-alias)
  - [Meter (interface)](#meter-interface)
  - [Span (interface)](#span-interface)
  - [SpanOptions (interface)](#spanoptions-interface)
  - [Telemetry](#telemetry)
  - [Telemetry (interface)](#telemetry-interface)
  - [TelemetryTypeId](#telemetrytypeid)
  - [TelemetryTypeId (type alias)](#telemetrytypeid-type-alias)
  - [Tracer (interface)](#tracer-interface)
  - [currentSpanOption](#currentspanoption)
  - [currentSpanTag](#currentspantag)
  - [currentTelemetryOption](#currenttelemetryoption)
  - [currentTelemetryTag](#currenttelemetrytag)
  - [withSpan](#withspan)

---

# utils

## Api (type alias)

**Signature**

```ts
export type Api = typeof OtelApi
```

Added in v1.0.0

## Meter (interface)

**Signature**

```ts
export interface Meter extends OtelApi.Meter {}
```

Added in v1.0.0

## Span (interface)

**Signature**

```ts
export interface Span extends OtelApi.Span {}
```

Added in v1.0.0

## SpanOptions (interface)

**Signature**

```ts
export interface SpanOptions extends OtelApi.SpanOptions {}
```

Added in v1.0.0

## Telemetry

**Signature**

```ts
export declare const Telemetry: ({
  meter,
  tracer,
}: {
  meter: { name: string; version?: string }
  tracer: { name: string; version?: string }
}) => Layer.Layer<never, never, Telemetry>
```

Added in v1.0.0

## Telemetry (interface)

**Signature**

```ts
export interface Telemetry {
  readonly [TelemetryTypeId]: TelemetryTypeId
  readonly api: Api
  readonly tracer: Tracer
  readonly meter: Meter
}
```

Added in v1.0.0

## TelemetryTypeId

**Signature**

```ts
export declare const TelemetryTypeId: typeof TelemetryTypeId
```

Added in v1.0.0

## TelemetryTypeId (type alias)

**Signature**

```ts
export type TelemetryTypeId = typeof TelemetryTypeId
```

Added in v1.0.0

## Tracer (interface)

**Signature**

```ts
export interface Tracer extends OtelApi.Tracer {}
```

Added in v1.0.0

## currentSpanOption

**Signature**

```ts
export declare const currentSpanOption: (_: void) => Effect.Effect<never, never, Option<Span>>
```

Added in v1.0.0

## currentSpanTag

**Signature**

```ts
export declare const currentSpanTag: Context.Tag<Span>
```

Added in v1.0.0

## currentTelemetryOption

**Signature**

```ts
export declare const currentTelemetryOption: (_: void) => Effect.Effect<never, never, Option<Telemetry>>
```

Added in v1.0.0

## currentTelemetryTag

**Signature**

```ts
export declare const currentTelemetryTag: Context.Tag<Telemetry>
```

Added in v1.0.0

## withSpan

**Signature**

```ts
export declare const withSpan: {
  (name: string, options?: OtelApi.SpanOptions | undefined): <R, E, A>(
    self: Effect.Effect<R, E, A>
  ) => Effect.Effect<R, E, A>
  <R, E, A>(self: Effect.Effect<R, E, A>, name: string, options?: OtelApi.SpanOptions | undefined): Effect.Effect<
    R,
    E,
    A
  >
}
```

Added in v1.0.0
