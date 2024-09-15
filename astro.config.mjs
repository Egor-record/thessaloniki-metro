import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://thessaloniki-metro.gr',
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
  integrations: [vue(), sitemap()]
});