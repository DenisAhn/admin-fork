import path from 'path';

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import paths from 'vite-tsconfig-paths';

import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (
  paths: Record<string, string[]>
): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};
  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');
    webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });
  return webpackConfigAliases;
};

export default defineConfig({
  publicDir: './static',
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    svgr(),
    checker({
      typescript: true,
      overlay: false,
    }),
    paths(),
    mkcert(),
  ],
  resolve: {
    alias: {
      ...parseTsConfigPaths(tsconfig.compilerOptions.paths),
      styles: path.join(__dirname, 'src/styles'),
    },
  },

  build: {
    outDir: './public',
    assetsDir: 'static',
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
  server: {
    host: true,
    https: true,
    proxy: {
      '/api': {
        target: `https://`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
