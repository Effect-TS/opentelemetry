import * as path from "node:path"
import { defineConfig } from "vitest/config"

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
