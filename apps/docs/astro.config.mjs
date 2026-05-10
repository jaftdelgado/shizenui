// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), mdx()],

  vite: {
    resolve: {
      alias: {
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@examples": fileURLToPath(new URL("./src/examples", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url))
      }
    },
    plugins: [tailwindcss()]
  }
});
