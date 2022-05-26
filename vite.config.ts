import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3004,
    fs: {
      // Allow serving files from one level up to the project root
      allow: [".."],
    },
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      // eslint-disable-next-line no-undef
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      vue: path.resolve(`./node_modules/vue`)
    },
  },
});