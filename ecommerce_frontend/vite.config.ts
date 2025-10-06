import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            // 'context':path.resolve(__dirname, './src/context'),
            // 'pages':path.resolve(__dirname,'./src/pages' ),
            // 'assets':path.resolve(__dirname, './src/assets'),
            // 'components':path.resolve(__dirname, './src/components'),
            // 'services':path.resolve(__dirname, './src/services'),
            // 'layouts':path.resolve(__dirname, './src/layouts'),
            // 'reducers':path.resolve(__dirname, './src/reducers'),
            // 'routes':path.resolve(__dirname, './src/routes'),
            // 'hooks':path.resolve(__dirname, './src/hooks'),
            // 'helpers':path.resolve(__dirname, './src/helpers'),
        }
    }
})
