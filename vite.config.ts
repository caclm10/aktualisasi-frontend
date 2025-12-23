import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.md$/, // .md
            ],

            imports: [
                "react",
                "react-router",
                {
                    "react-router": ["Outlet", "Link"],

                    "react-hook-form": ["useForm", "Controller"],

                    "@hookform/resolvers/zod": ["zodResolver"],

                    swr: [["default", "useSWR"]],

                    "class-variance-authority": ["cva"],

                    sonner: ["toast"],
                },
                {
                    from: "react",
                    imports: ["ComponentProps"],
                    type: true,
                },
                {
                    from: "class-variance-authority",
                    imports: ["VariantProps"],
                    type: true,
                },
            ],

            dirsScanOptions: {
                types: true,
            },

            dirs: [
                "./src/hooks/**",
                "./src/components/**", // all nested modules
                "./src/layouts/**",
                "./src/lib/**",
                "./src/views/**",
                "./src/schemas/**",
                "./src/types/**",
            ],

            dts: "./src/auto-imports.d.ts",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
