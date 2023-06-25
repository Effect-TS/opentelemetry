---
title: Tracer.ts
nav_order: 2
parent: Modules
---

## Tracer overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
- [models](#models)
  - [TracerOptions (interface)](#traceroptions-interface)

---

# constructors

## make

**Signature**

```ts
export declare const make: (options: TracerOptions) => Effect<never, never, Tracer>
```

Added in v1.0.0

# layers

## layer

**Signature**

```ts
export declare const layer: (options: TracerOptions) => Layer<never, never, never>
```

Added in v1.0.0

# models

## TracerOptions (interface)

**Signature**

```ts
export interface TracerOptions {
  readonly name: string
  readonly version?: string
}
```

Added in v1.0.0
