/// <reference types="vite/client" />
// vite.config.js o vite.config.ts

export default defineConfig({
    env: {
      COMMON_API_URL: import.meta.env.MODE === 'production'
        ? 'https://api.example.com'
        : 'http://localhost:3000',
      COMMON_API_KEY: import.meta.env.MODE === 'production'
        ? '123456'
        : 'abcdef',
    },
    // ...
  });
  