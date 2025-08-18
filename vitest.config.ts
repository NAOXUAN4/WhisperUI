/// <reference types = "vitest"/>


import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vueJsx()
  ],
  test:{
    globals: true,
    environment: 'jsdom'
  }
});
