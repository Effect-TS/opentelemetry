---
title: WebSdk.ts
nav_order: 6
parent: Modules
---

## WebSdk overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [layer](#layer)
  - [layer](#layer-1)
- [layers](#layers)
  - [layerTracerProvider](#layertracerprovider)
- [model](#model)
  - [Configuration (interface)](#configuration-interface)

---

# layer

## layer

**Signature**

```ts
export declare const layer: (evaluate: LazyArg<Configuration>) => Layer.Layer<Resource, never, never>
```

Added in v1.0.0

# layers

## layerTracerProvider

**Signature**

```ts
export declare const layerTracerProvider: (
  processor: SpanProcessor,
  config?: Omit<TracerConfig, 'resource'>
) => Layer.Layer<Resource, never, TracerProvider>
```

Added in v1.0.0

# model

## Configuration (interface)

**Signature**

```ts
export interface Configuration {
  readonly spanProcessor?: SpanProcessor
  readonly tracerConfig?: Omit<TracerConfig, 'resource'>
  readonly metricReader?: MetricReader
}
```

Added in v1.0.0
