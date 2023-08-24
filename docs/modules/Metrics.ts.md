---
title: Metrics.ts
nav_order: 1
parent: Modules
---

## Metrics overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [labels](#labels)
  - [aggregationTemporalityLabel](#aggregationtemporalitylabel)
  - [incrementalOnlyLabel](#incrementalonlylabel)
  - [integerLabel](#integerlabel)
  - [unitLabel](#unitlabel)
- [layers](#layers)
  - [layer](#layer)
- [producer](#producer)
  - [makeProducer](#makeproducer)
  - [registerProducer](#registerproducer)

---

# labels

## aggregationTemporalityLabel

**Signature**

```ts
export declare const aggregationTemporalityLabel: (value: 'delta' | 'cumulative') => MetricLabel
```

Added in v1.0.0

## incrementalOnlyLabel

**Signature**

```ts
export declare const incrementalOnlyLabel: MetricLabel
```

Added in v1.0.0

## integerLabel

**Signature**

```ts
export declare const integerLabel: MetricLabel
```

Added in v1.0.0

## unitLabel

**Signature**

```ts
export declare const unitLabel: (unit: string) => MetricLabel
```

Added in v1.0.0

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
