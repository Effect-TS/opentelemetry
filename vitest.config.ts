/// <reference types="vitest" />

import * as path from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.test.ts"],
    globals: true
  },
  resolve: {
    alias: {
      "@effect/opentelemetry/test": path.join(__dirname, "test"),
      "@effect/opentelemetry": path.join(__dirname, "src")
    }
  }
})
