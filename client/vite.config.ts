import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: path.resolve(process.cwd(), "../public/"),
  },
})
