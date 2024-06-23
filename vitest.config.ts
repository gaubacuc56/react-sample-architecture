import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        environment: "jsdom",
    },
    resolve: {
        alias: [
            {
                find: "@libs",
                replacement: path.resolve(__dirname, "./src/libs"),
            },
            {
                find: "@app-core",
                replacement: path.resolve(__dirname, "./src/app-core"),
            },
            {
                find: "@pages",
                replacement: path.resolve(__dirname, "./src/pages"),
            },
            {
                find: "@assets",
                replacement: path.resolve(__dirname, "./src/assets"),
            },
            {
                find: "@layout",
                replacement: path.resolve(__dirname, "./src/layout"),
            },
            {
                find: "@constant",
                replacement: path.resolve(__dirname, "./src/constant"),
            },
            {
                find: "@config",
                replacement: path.resolve(__dirname, "./src/config"),
            },
            {
                find: "@",
                replacement: path.resolve(__dirname, "./src"),
            },
        ],
    },
});
