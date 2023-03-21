import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// @ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			// @ts-ignore
			"~": path.resolve(__dirname, "./src"),
		},
	},
});
