---
title: NodeSdk.ts
nav_order: 3
parent: Modules
---

## NodeSdk overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [config](#config)
- [layer](#layer)
  - [layer](#layer-1)
- [model](#model)
  - [Configuration (type alias)](#configuration-type-alias)

---

# constructor

## config

**Signature**

```ts
export declare const config: (config: Configuration) => Configuration
```

Added in v1.0.0

# layer

## layer

**Signature**

```ts
export declare const layer: <R, E>(
  config: Effect.Effect<R, E, Partial<Omit<NodeSDKConfiguration, 'resource' | 'serviceName'>>>
) => Layer.Layer<Resource | R, E, never>
```

Added in v1.0.0

# model

## Configuration (type alias)

**Signature**

```ts
export type Configuration = Partial<Omit<NodeSDKConfiguration, 'resource' | 'serviceName'>>
```

Added in v1.0.0
