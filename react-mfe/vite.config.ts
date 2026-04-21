import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import path from "path";

export default defineConfig({
  plugins: [
    federation({
      name: "reactMfe",
      // Exposes: import('reactMfe/ProjectsPage') in the shell
      manifest: true,
      exposes: {
        "./ProjectsPage": "./src/ProjectsPage",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-router-dom": { singleton: true, requiredVersion: "^7.1.0" },
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./src"),
    },
  },
  server: { port: 3001, origin: "http://localhost:3001" },
  // Required: build to ESM for MF 2.0
  build: {
    target: "esnext",
    minify: false,
  },
});
