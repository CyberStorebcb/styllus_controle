import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import packageVersion from 'vite-plugin-package-version'

export default defineConfig({
  plugins: [vue(), packageVersion()],
  base: '/styllus_controle/',
})
