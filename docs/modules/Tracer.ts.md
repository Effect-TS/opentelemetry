---
title: Tracer.ts
nav_order: 5
parent: Modules
---

## Tracer overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [accessors](#accessors)
  - [currentOtelSpan](#currentotelspan)
- [constructors](#constructors)
  - [make](#make)
  - [makeExternalSpan](#makeexternalspan)
- [layers](#layers)
  - [layer](#layer)
  - [layerOtelTracer](#layeroteltracer)
- [tags](#tags)
  - [OtelTracer](#oteltracer)
  - [TraceFlags](#traceflags)
  - [TraceState](#tracestate)

---

# accessors

## currentOtelSpan

**Signature**

```ts
export declare const currentOtelSpan: Effect<never, never, Option.Option<Otel.Span>>
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: Effect<Otel.Tracer, never, Tracer>
```

Added in v1.0.0

## makeExternalSpan

**Signature**

```ts
export declare const makeExternalSpan: (options: {
  readonly traceId: string
  readonly spanId: string
  readonly traceFlags?: number | undefined
  readonly traceState?: string | Otel.TraceState | undefined
}) => ExternalSpan
```

Added in v1.0.0

# layers

## layer

**Signature**

```ts
export declare const layer: Layer<Resource, never, never>
```

Added in v1.0.0

## layerOtelTracer

**Signature**

```ts
export declare const layerOtelTracer: Layer<Resource, never, Otel.Tracer>
```

Added in v1.0.0

# tags

## OtelTracer

**Signature**

```ts
export declare const OtelTracer: Tag<Otel.Tracer, Otel.Tracer>
```

Added in v1.0.0

## TraceFlags

**Signature**

```ts
export declare const TraceFlags: Tag<Otel.TraceFlags, Otel.TraceFlags>
```

Added in v1.0.0

## TraceState

**Signature**

```ts
export declare const TraceState: Tag<Otel.TraceState, Otel.TraceState>
```

Added in v1.0.0
