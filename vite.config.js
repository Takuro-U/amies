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
                //追加のSassオプション
            },
        },
    },
    //
    server: {
        proxy: {
            "/app": process.env.APP_URL,
        },
        historyApiFallback: {
            index: "/index.php",
            disableDotRule: true,
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: [
                        "react",
                        "react-dom",
                        "@inertiajs/react",
                        "@inertiajs/inertia",
                    ],
                },
            },
        },
    },
});
