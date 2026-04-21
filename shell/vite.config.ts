import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

const isProd = process.env.NODE_ENV === "production";

// In dev the remotes run as Vite dev servers on fixed ports.
// In prod they are co-deployed under the same origin (GitHub Pages layout):
//   /react-mfe/mf-manifest.json
//   /vue-mfe/mf-manifest.json
const REACT_MFE_ENTRY = isProd
  ? "/react-mfe/mf-manifest.json"
  : "http://localhost:3001/mf-manifest.json";
const VUE_MFE_ENTRY = isProd
  ? "/vue-mfe/mf-manifest.json"
  : "http://localhost:3002/mf-manifest.json";

// https://module-federation.io/guide/basic/vite.html
export default defineConfig({
  plugins: [
    federation({
      name: "shell",
      // dts: {
      //   consumeTypes: false,
      // },
      remotes: {
        // React MFE — runs on :3001 in dev, served statically in prod
        reactMfe: {
          type: "module",
          name: "reactMfe",
          entry: REACT_MFE_ENTRY,
          shareScope: "default",
        },
        // Vue MFE — runs on :3002 in dev, served statically in prod
        vueMfe: {
          type: "module",
          name: "vueMfe",
          entry: VUE_MFE_ENTRY,
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
  // build: {
  //   target: "esnext",
  //   minify: false,
  // },
});
