import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const USE_REPO_PAGES = !process.env.VITE_ROOT_PAGES
const REPO_NAME = path.basename(process.cwd())
const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'
const base = mode === 'production' && USE_REPO_PAGES ? `/${REPO_NAME}/` : '/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  mode,
  plugins: [react()]
})
