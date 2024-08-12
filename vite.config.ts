import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dynamicImport from "vite-plugin-dynamic-import";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ["babel-plugin-macros"],
			},
		}),
		dynamicImport(),
	],
	envPrefix: "APP_",
 	server: {
		port: 3000,
		strictPort: true,
    	host: true
	},
	assetsInclude: ["**/*.md"],
	resolve: {
		alias: {
			"@libs": path.resolve(__dirname, "./src/libs"),
			"@app-core": path.resolve(__dirname, "./src/app-core"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@layout": path.resolve(__dirname, "./src/layout"),
			"@constant": path.resolve(__dirname, "./src/constant"),
			"@config": path.resolve(__dirname, "./src/config"),
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
