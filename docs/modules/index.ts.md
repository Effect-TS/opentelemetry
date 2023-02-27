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
  - [Api (interface)](#api-interface)
  - [Span (interface)](#span-interface)
  - [SpanOptions (interface)](#spanoptions-interface)
  - [Tracer](#tracer)
  - [Tracer (interface)](#tracer-interface)
  - [currentApi](#currentapi)
  - [currentApiTag](#currentapitag)
  - [currentSpan](#currentspan)
  - [currentSpanTag](#currentspantag)
  - [currentTracer](#currenttracer)
  - [currentTracerTag](#currenttracertag)
  - [withSpan](#withspan)

---

# utils

## Api

**Signature**

```ts
export declare const Api: Layer.Layer<never, never, Api>
```

Added in v1.0.0

## Api (interface)

**Signature**

```ts
export interface Api extends _Api {}
```

Added in v1.0.0

## Span (interface)

**Signature**

```ts
export interface Span extends _api.Span {}
```

Added in v1.0.0

## SpanOptions (interface)

**Signature**

```ts
export interface SpanOptions extends _api.SpanOptions {}
```

Added in v1.0.0

## Tracer

**Signature**

```ts
export declare const Tracer: (name: string, version?: string | undefined) => Layer.Layer<never, never, Api | Tracer>
```

Added in v1.0.0

## Tracer (interface)

**Signature**

```ts
export interface Tracer extends _api.Tracer {}
```

Added in v1.0.0

## currentApi

**Signature**

```ts
export declare const currentApi: Effect.Effect<never, never, Option<Api>>
```

Added in v1.0.0

## currentApiTag

**Signature**

```ts
export declare const currentApiTag: Context.Tag<Api>
```

Added in v1.0.0

## currentSpan

**Signature**

```ts
export declare const currentSpan: Effect.Effect<never, never, Option<Span>>
```

Added in v1.0.0

## currentSpanTag

**Signature**

```ts
export declare const currentSpanTag: Context.Tag<Span>
```

Added in v1.0.0

## currentTracer

**Signature**

```ts
export declare const currentTracer: Effect.Effect<never, never, Option<Tracer>>
```

Added in v1.0.0

## currentTracerTag

**Signature**

```ts
export declare const currentTracerTag: Context.Tag<Tracer>
```

Added in v1.0.0

## withSpan

**Signature**

```ts
export declare const withSpan: {
  (name: string, options?: SpanOptions | undefined): <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
  <R, E, A>(self: Effect.Effect<R, E, A>, name: string, options?: SpanOptions | undefined): Effect.Effect<R, E, A>
}
```

Added in v1.0.0
