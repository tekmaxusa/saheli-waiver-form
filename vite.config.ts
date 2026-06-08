import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** One folder per public waiver URL (GitHub Pages MPA entries). */
const WAIVER_HTML_PATHS = [
  'sahelieyebrow-centennial',
  'sahelieyebrow-aurora',
  'sahelieyebrow-thornton',
  'sahelieyebrow-denver',
  'sahelieyebrow-parker',
] as const;

function buildRollupInput(): Record<string, string> {
  const input: Record<string, string> = {
    main: path.resolve(__dirname, 'index.html'),
  };
  for (const folder of WAIVER_HTML_PATHS) {
    input[folder] = path.resolve(__dirname, folder, 'index.html');
  }
  return input;
}

export default defineConfig(() => {
  const base =
    (process.env.VITE_BASE_URL && process.env.VITE_BASE_URL.trim()) || '/';
  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: buildRollupInput(),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
