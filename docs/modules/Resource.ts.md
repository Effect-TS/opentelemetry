---
title: Resource.ts
nav_order: 3
parent: Modules
---

## Resource overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [identifier](#identifier)
  - [Resource (interface)](#resource-interface)
- [layer](#layer)
  - [layer](#layer-1)
- [tag](#tag)
  - [Resource](#resource)

---

# identifier

## Resource (interface)

**Signature**

```ts
export interface Resource {
  readonly _: unique symbol
}
```

Added in v1.0.0

# layer

## layer

**Signature**

```ts
export declare const layer: (config: {
  readonly serviceName: string
  readonly serviceVersion?: string
  readonly attributes?: Resources.ResourceAttributes
}) => Layer.Layer<never, never, Resource>
```

Added in v1.0.0

# tag

## Resource

**Signature**

```ts
export declare const Resource: Tag<Resource, Resources.Resource>
```

Added in v1.0.0
