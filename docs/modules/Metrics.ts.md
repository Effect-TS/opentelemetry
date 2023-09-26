---
title: Metrics.ts
nav_order: 1
parent: Modules
---

## Metrics overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [layers](#layers)
  - [layer](#layer)
- [producer](#producer)
  - [makeProducer](#makeproducer)
  - [registerProducer](#registerproducer)

---

# layers

## layer

**Signature**

```ts
export declare const layer: (evaluate: LazyArg<MetricReader>) => Layer<Resource, never, never>
```

Added in v1.0.0

# producer

## makeProducer

**Signature**

```ts
export declare const makeProducer: Effect.Effect<Resource, never, MetricProducer>
```

Added in v1.0.0

## registerProducer

**Signature**

```ts
export declare const registerProducer: (
  self: MetricProducer,
  metricReader: LazyArg<MetricReader>
) => Effect.Effect<Scope.Scope, never, MetricReader>
```

Added in v1.0.0
