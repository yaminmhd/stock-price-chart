/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest-setup.ts",
    coverage: {
      provider: "v8",
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
      exclude: [
        "**/*.d.ts",
        "src/App.tsx",
        "src/main.tsx",
        "src/queryClient.ts",
        "src/__mocks__/zustand.ts",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint}.config.*",
      ],
    },
  },
});
