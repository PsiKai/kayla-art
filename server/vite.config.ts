import { defineConfig } from "vite"

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "src/server.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      external: ["express"],
    },
  },
})
