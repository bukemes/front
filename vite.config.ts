import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 9003
    },
    preview: {
        port: 9003,
        open: true
    },
    css: { postcss: './postcss.config.cjs' },
});
