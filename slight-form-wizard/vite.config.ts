import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3200
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['src/**/*'],
      outDir: './dist/types',
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'SlightFormWizard',
      fileName: (format) => `slight-form-wizard.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
