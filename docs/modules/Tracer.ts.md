---
title: Tracer.ts
nav_order: 3
parent: Modules
---

## Tracer overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
  - [makeExternalSpan](#makeexternalspan)
- [layers](#layers)
  - [layer](#layer)
- [tags](#tags)
  - [TraceFlags](#traceflags)
  - [TraceState](#tracestate)

---

# constructors

## make

**Signature**

```ts
export declare const make: Effect<Resource, never, Tracer>
```

Added in v1.0.0

## makeExternalSpan

**Signature**

```ts
export declare const makeExternalSpan: (options: {
  readonly name: string
  readonly traceId: string
  readonly spanId: string
  readonly traceFlags?: Otel.TraceFlags
  readonly traceState?: string
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
