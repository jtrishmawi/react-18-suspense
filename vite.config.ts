import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/react-state-n-suspense/" : "/",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
      helpers: path.resolve(__dirname, "src/helpers"),
      hooks: path.resolve(__dirname, "src/hooks"),
      state: path.resolve(__dirname, "src/state"),
      errors: path.resolve(__dirname, "src/errors"),
    },
  },
  server: { port: 3000 },
}));
