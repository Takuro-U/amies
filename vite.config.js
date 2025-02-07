import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/app.tsx", "resources/console.tsx"],
            refresh: true,
        }),
        react(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                // ここに追加のSassオプションを指定できます
            },
        },
    },
    //
    server: {
        proxy: {
            "/app": "http://localhost:8000", // Laravelサーバーへのプロキシ
        },
    },
});
