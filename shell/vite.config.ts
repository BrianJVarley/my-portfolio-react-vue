import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://module-federation.io/guide/basic/vite.html
export default defineConfig({
  plugins: [
    federation({
      name: "shell",
      dts: {
        consumeTypes: false,
      },
      remotes: {
        // React MFE — runs on :3001 in dev, served statically in prod
        reactMfe: {
          type: "module",
          name: "reactMfe",
          entry: "http://localhost:3001/mf-manifest.json",
          shareScope: "default",
        },
        // Vue MFE — runs on :3002 in dev, served statically in prod
        vueMfe: {
          type: "module",
          name: "vueMfe",
          entry: "http://localhost:3002/mf-manifest.json",
          shareScope: "default",
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-router-dom": { singleton: true, requiredVersion: "^7.1.0" },
      },
    }),
    react(),
  ],
  server: { port: 3000 },
  // Required for Module Federation shared chunks that use top-level await.
  build: {
    target: "esnext",
    minify: false,
  },
});
