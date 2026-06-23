import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base is relative so the built site can be opened/hosted from any subpath.
export default defineConfig({
  plugins: [react()],
  base: './',
});
