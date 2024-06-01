import vue from '@vitejs/plugin-vue'
import autoprefixer from "autoprefixer"
import path from "path"
import tailwind from "tailwindcss"
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
// https://vitejs.dev/config/
export default (({ mode }: any) => {
  const env = loadEnv(mode, process.cwd())

  const config = {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      open: false,
      host: '0.0.0.0',
      port: 8081,
      proxy: {
        '/api': {
          target: env.VITE_PROXY,
          headers: {},
          changeOrigin: true,
        },
        '/header_imgs': {
          target: env.VITE_PROXY_PRODUCTION,
          headers: {},
          changeOrigin: true,
        },
      }
    }
  }
  return defineConfig(config)
})
