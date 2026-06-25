import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
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
});
