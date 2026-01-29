export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://hrms-lite-production-0a5b.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
