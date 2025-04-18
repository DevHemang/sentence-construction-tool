import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  
  },
  css: {
    postcss: './postcss.config.js', // Ensure this path matches your file location
  },
});
