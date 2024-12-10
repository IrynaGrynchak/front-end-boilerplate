import { defineConfig } from 'vitest/config';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // Enables global functions like `describe` and `it`
    environment: 'jsdom', // Use jsdom for browser-like testing
    include: ['tests/**/*.test.ts'], // Include all test files
    alias: {
        '~': path.resolve(__dirname, './app'), // Alias for your `app` directory
        '@': path.resolve(__dirname, './app'), // Optional: Alternative alias
      },
  },
});

