import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Simplifies the import paths and removes redundant versioned aliases
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist', // Vercel standard for Vite is 'dist'
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
});
