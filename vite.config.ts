import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { splitVendorChunkPlugin } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({ 
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            }
        }),
        splitVendorChunkPlugin()
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
        sourcemap: true,
        rollupOptions: {
            output:{
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    }
});
