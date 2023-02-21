import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default ({ command, mode }) => {
  const usingRepoPages = !process.env.VITE_ROOT_PAGES
  const folderName = path.basename(process.cwd())
  // append folder name to base path if using GitHub/GitLab repo pages
  const base = mode === 'production' && usingRepoPages ? `/${folderName}/` : '/'

  console.log('Configuring with...', {
    command,
    mode,
    usingRepoPages,
    folderName,
    base
  })

  return defineConfig({
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
    },
    server: {
      watch: {
        ignored: [
          `**/${folderName}/target/**`, // ignore 3th-party output
          `**/${folderName}/docs/**`, // ignore docs folder
          `**/${folderName}/src-docs/**`, // ignore src-docs folder
          `**/${folderName}/jsdoc.json`, // ignore jsdoc config
          `**/${folderName}/README.md` // ignore jsdoc config
        ]
      }
    }
  })
}

function srcAliasOf(slug = '') {
  const url = new URL('./src/' + slug, import.meta.url)
  return fileURLToPath(url)
}
