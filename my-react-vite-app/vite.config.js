import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/predict": {
        // Replace '/api' with your backend API prefix
        target: "http://127.0.0.1:5000", // Replace with your backend URL
        changeOrigin: true, // Change origin to match frontend
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' prefix
      },
    },
  },
});
