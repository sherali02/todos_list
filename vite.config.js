import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/todos_list1/', // Replace 'your-repo-name' with your GitHub repository name
  build: {
    outDir: 'dist', // This is the default, but ensure it is set correctly
  },
})
