import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/articles': {
        target: 'http://localhost:8080', // The URL of your backend
        changeOrigin: true,             // Ensures the origin header is correctly set
      },
    },
  },
});
