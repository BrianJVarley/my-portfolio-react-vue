import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    federation({
      name: "vueMfe",
      // Exposes: import('vueMfe/AboutPage') in the shell
      manifest: true,
      exposes: {
        "./AboutPage": "./src/AboutPageWrapper",
      },
      shared: {
        vue: { singleton: true, requiredVersion: "^3.5.0" },
        react: { singleton: true, requiredVersion: "^19.0.0" },
      },
    }),
    vue({ customElement: /AboutPage\.vue/ }),
    react(),
  ],
  server: { port: 3002, origin: "http://localhost:3002" },
  // Tells Vite (and the MF manifest) the public root in production,
  // so remoteEntry URLs resolve to /vue-mfe/assets/... not /assets/...
  base: isProd ? "/vue-mfe/" : "/",
  build: {
    target: "esnext",
    minify: false,
  },
});
