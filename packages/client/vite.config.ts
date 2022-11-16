import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import * as path from 'path';
import {VitePWA} from 'vite-plugin-pwa';
import type {VitePWAOptions} from 'vite-plugin-pwa';

dotenv.config();

const pwaOptions: Partial<VitePWAOptions> = {
  manifest: {
    'name': 'Racer--boom',
    'short_name': 'Racer boom',
    'theme_color': '#15fff1',
    'background_color': '#141e30',
    'display': 'standalone',
    'orientation': 'portrait',
    'start_url': '.',
    'icons': [
      {
        'src': '/vite.svg',
        'sizes': '32x32',
      }],
  },
  base: '/',
  includeAssets: ['vite.svg'],
  strategies: 'injectManifest',
  registerType: 'autoUpdate',
  srcDir: '.',
  filename: 'sw.ts',
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  build: {
    chunkSizeWarningLimit:1000,
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      'public/': `${path.resolve(__dirname, 'public')}/`,
    },
  },
  plugins: [
    react(),
    VitePWA(pwaOptions),
  ],
});
