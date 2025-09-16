import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(`Current mode: ${mode}`);
  return {
    plugins: [
      vue(),
      // 打包分析插件
      process.env.npm_lifecycle_event === "report"
        ? visualizer({ open: true, brotliSize: true, filename: "report.html" })
        : (null as any),
      // 压缩插件
      mode === "production"
        ? viteCompression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 10240,
            compressionOptions: {
              level: 9
            }
          })
        : (null as any)
    ].filter(Boolean),
    // 设置别名
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    // 本地开发服务器配置
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT, 10) : 3000,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:8080",
          changeOrigin: true,
          rewrite: p => p.replace(/^\/api/, "")
        }
      },
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/**/*"]
      }
    },
    // 生产环境构建配置
    build: {
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: fileURLToPath(new URL("./index.html", import.meta.url))
          // 其他入口文件添加: fileURLToPath(new URL("./about.html", import.meta.url))
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
