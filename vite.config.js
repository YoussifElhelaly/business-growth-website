import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
    proxy: {
      "/api": {
        target: `http://localhost:${Number(process.env.API_PORT) || 4001}`,
        changeOrigin: true,
      },
    },
  },
});
