import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://jobangup.online/', // The URL of your backend
        changeOrigin: true,             // Ensures the origin header is correctly set
      },
    },
  },
});
