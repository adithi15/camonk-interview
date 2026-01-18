import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: '/camonk-interview/', // Added the missing comma here
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});