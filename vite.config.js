import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default ({ command, mode }) => {
  const root = process.cwd()
  const folderName = path.basename(root)
  // append folder name to base path if using GitHub/GitLab repo pages
  const usingRepoPages = !process.env.VITE_ROOT_PAGES
  const base = mode === 'production' && usingRepoPages ? `/${folderName}/` : '/'

  const isBuild = command === 'build'

  console.log('Configuring with...', {
    command,
    mode,
    usingRepoPages,
    root,
    folderName,
    base
  })

  return defineConfig({
    root,
    base,
    mode,
    plugins: [
      react(),
      createHtmlPlugin({
        minify: isBuild,
        inject: {
          // Inject data into ejs template
          data: {
            PUBLIC_URL: base,
            TITLE: 'OMDb Search',
            DESCRIPTION:
              'Search for movies, TV shows, Series, Episodes and Games using the OMDb API',
            KEYWORDS:
              'IMDb,OMDb,OMDb API,search,api,react,vite,application,games,movies,series,anime,documentary,short,video,game,episode,episodes,app,web,website,web app',
            THEME_COLOR: '#0068b5'
          }
        }
      })
    ],
    test: {
      coverage: {
        provider: 'c8',
        reportsDirectory: './target/coverage',
        reporter: [
          'json',
          'json-summary',
          'lcovonly',
          'text',
          'text-summary',
          'clover',
          'cobertura'
        ]
      },
      environment: 'node',
      environmentMatchGlobs: [
        // all tests in __tests__/ with .XXX.test.js will run in that environment
        ['**/*.*dom.test.js', 'jsdom'],
        ['**/*.*dom.test.jsx', 'jsdom'],
        ['**/*.*dom.spec.js', 'jsdom'],
        ['**/*.*dom.spec.jsx', 'jsdom']
        // ...
      ],
      globals: true,
      setupFiles: [
        // setup files for all tests
        './__tests__/setup-tests.js'
      ]
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    },
    resolve: {
      alias: {
        '@': srcAliasOf(),
        '@components': srcAliasOf('components'),
        '@context': srcAliasOf('context'),
        '@hooks': srcAliasOf('hooks'),
        '@services': srcAliasOf('services'),
        '@shared': srcAliasOf('shared')
      }
    },
    server: {
      watch: {
        ignored: [
          `**/${folderName}/__test__/**`, // ignore test folder
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
