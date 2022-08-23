import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({ 
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            }
        })
    ],
    server: {
        port: 9003
    },
    preview: {
        port: 9003,
        open: true
    },
    css: { postcss: './postcss.config.cjs' },
    build: {
        target: 'esnext',
        minify: 'esbuild',
        sourcemap: true
    }
});
