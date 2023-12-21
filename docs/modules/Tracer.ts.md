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
  - [layerGlobal](#layerglobal)
  - [layerGlobalTracer](#layerglobaltracer)
  - [layerTracer](#layertracer)
- [tags](#tags)
  - [TraceFlags](#traceflags)
  - [TraceState](#tracestate)
  - [Tracer](#tracer)
  - [TracerProvider](#tracerprovider)

---

# accessors

## currentOtelSpan

**Signature**

```ts
export declare const currentOtelSpan: Effect<never, NoSuchElementException, Otel.Span>
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: Effect<Otel.Tracer, never, EffectTracer>
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
export declare const layer: Layer<Resource | Otel.TracerProvider, never, never>
```

Added in v1.0.0

## layerGlobal

**Signature**

```ts
export declare const layerGlobal: Layer<Resource, never, never>
```

Added in v1.0.0

## layerGlobalTracer

**Signature**

```ts
export declare const layerGlobalTracer: Layer<Resource, never, Otel.Tracer>
```

Added in v1.0.0

## layerTracer

**Signature**

```ts
export declare const layerTracer: Layer<Resource | Otel.TracerProvider, never, Otel.Tracer>
```

Added in v1.0.0

# tags

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

## Tracer

**Signature**

```ts
export declare const Tracer: Tag<Otel.Tracer, Otel.Tracer>
```

Added in v1.0.0

## TracerProvider

**Signature**

```ts
export declare const TracerProvider: Tag<Otel.TracerProvider, Otel.TracerProvider>
```

Added in v1.0.0
