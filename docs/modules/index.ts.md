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
  - [Api](#api)
  - [Tracer](#tracer)
  - [currentApi](#currentapi)
  - [currentSpan](#currentspan)
  - [currentTracer](#currenttracer)
  - [withSpan](#withspan)

---

# utils

## Api

**Signature**

```ts
export declare const Api: Layer.Layer<never, never, never>
```

Added in v1.0.0

## Tracer

**Signature**

```ts
export declare const Tracer: (name: string, version?: string | undefined) => Layer.Layer<never, never, never>
```

Added in v1.0.0

## currentApi

**Signature**

```ts
export declare const currentApi: FiberRef.FiberRef<Option.Option<typeof OtelApi>>
```

Added in v1.0.0

## currentSpan

**Signature**

```ts
export declare const currentSpan: FiberRef.FiberRef<Option.Option<OtelApi.Span>>
```

Added in v1.0.0

## currentTracer

**Signature**

```ts
export declare const currentTracer: FiberRef.FiberRef<Option.Option<OtelApi.Tracer>>
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
