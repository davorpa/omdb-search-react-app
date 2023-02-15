import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
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
  plugins: [react()],
  resolve: {
    alias: {
      '@': srcAliasOf(),
      '@components': srcAliasOf('components'),
      '@context': srcAliasOf('context'),
      '@hooks': srcAliasOf('hooks'),
      '@services': srcAliasOf('services')
    }
  }
})

function srcAliasOf(slug = '') {
  const url = new URL('./src/' + slug, import.meta.url)
  return fileURLToPath(url)
}
