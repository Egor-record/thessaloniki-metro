import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      sourcemap: true
    },
    resolve: {
      preserveSymlinks: true
    },
    css: {
      devSourcemap: true,
      transformer: "postcss"
    }
  },
  integrations: [vue()]
});