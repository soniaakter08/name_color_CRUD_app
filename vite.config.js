import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "namecolor.test",
        port: 5173,
        strictPort: true,
        hmr: {
            host: "namecolor.test",
            protocol: "http",
            port: 5173,
        },
    },
});
