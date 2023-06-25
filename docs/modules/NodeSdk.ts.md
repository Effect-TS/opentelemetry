---
title: NodeSdk.ts
nav_order: 1
parent: Modules
---

## NodeSdk overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [layer](#layer)
  - [layer](#layer-1)

---

# layer

## layer

**Signature**

```ts
export declare const layer: (
  config: Partial<Omit<NodeSDKConfiguration, 'resource' | 'serviceName'>>
) => Layer.Layer<Resource, never, never>
```

Added in v1.0.0
