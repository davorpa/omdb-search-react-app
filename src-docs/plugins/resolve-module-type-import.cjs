const path = require('node:path')
const fs = require('node:fs')
const env = require('jsdoc/env') // eslint-disable-line import/no-unresolved

const config = env.conf.typescript
if (!config) {
  throw new Error(
    'Configuration "typescript" for jsdoc-plugin-typescript missing.'
  )
}
if (!('moduleRoot' in config)) {
  throw new Error(
    'Configuration "typescript.moduleRoot" for jsdoc-plugin-typescript missing.'
  )
}
const moduleRoot = config.moduleRoot
const moduleRootAbsolute = path.join(process.cwd(), moduleRoot)
if (!fs.existsSync(moduleRootAbsolute)) {
  throw new Error(
    'Directory "' +
      moduleRootAbsolute +
      '" does not exist. Check the "typescript.moduleRoot" config option for jsdoc-plugin-typescript'
  )
}

const typedTagsWithImportRegEx =
  /((?:\*\s*@(?:class|constructor|constant|const|enum|implements|member|var|module|namespace|package|param|arg|argument|private|property|prop|protected|returns?|throws|exception|type|typedef|yield))\s*\{\s*)??import\(["']([^"']*)["']\)(?:\.([^ .|}><,)=#\n]*))?([ .|}><,)=#\n])(\s*\})?/g
const extensionReplaceRegEx = /\.m?js$/
const slashRegEx = /\\/g

const moduleInfos = {}
const fileNodes = {}

function getExtension(absolutePath) {
  return extensionReplaceRegEx.test(absolutePath)
    ? extensionReplaceRegEx.exec(absolutePath)[0]
    : '.js'
}

function getModuleInfo(moduleId, extension, parser) {
  if (!moduleInfos[moduleId]) {
    if (!fileNodes[moduleId]) {
      const absolutePath = [
        moduleId + extension,
        moduleId + '/index.js',
        moduleId + '/index.mjs',
        moduleId + '/index.cjs',
        moduleId + '/index.jsx'
      ]
        .map((slug) => path.join(process.cwd(), moduleRoot, slug))
        .find((path) => fs.existsSync(path))
      if (!absolutePath) {
        return null
      }
      const file = fs.readFileSync(absolutePath, 'UTF-8')
      fileNodes[moduleId] = parser.astBuilder.build(file, absolutePath)
    }
    moduleInfos[moduleId] = { namedExports: {} }
    const moduleInfo = moduleInfos[moduleId]
    const node = fileNodes[moduleId]
    if (node.program && node.program.body) {
      const classDeclarations = {}
      const nodes = node.program.body
      for (let i = 0, ii = nodes.length; i < ii; ++i) {
        const node = nodes[i]
        if (node.type === 'ClassDeclaration') {
          classDeclarations[node.id.name] = node
        } else if (node.type === 'ExportDefaultDeclaration') {
          const classDeclaration = classDeclarations[node.declaration.name]
          if (classDeclaration) {
            moduleInfo.defaultExport = classDeclaration.id.name
          }
        } else if (
          node.type === 'ExportNamedDeclaration' &&
          node.declaration &&
          node.declaration.type === 'ClassDeclaration'
        ) {
          moduleInfo.namedExports[node.declaration.id.name] = true
        }
      }
    }
  }
  return moduleInfos[moduleId]
}

function getDefaultExportName(moduleId, parser) {
  return getModuleInfo(moduleId, parser).defaultExport
}

function getDelimiter(moduleId, symbol, parser) {
  return getModuleInfo(moduleId, parser).namedExports[symbol] ? '.' : '~'
}

exports.astNodeVisitor = {
  visitNode: function (node, e, parser, currentSourceName) {
    if (node.comments) {
      node.comments.forEach((comment) => {
        // Convert `import("path/to/module").export` to
        // `module:path/to/module~Name`
        let matchParts, lastExpression, replaceAttempt
        while ((matchParts = typedTagsWithImportRegEx.exec(comment.value))) {
          typedTagsWithImportRegEx.lastIndex = 0
          const expression = matchParts[0]
          const prefix = matchParts[1] ?? ''
          const importSource = matchParts[2]
          const exportName = matchParts[3] ?? 'default'
          const remainder = (matchParts[4] ?? '') + (matchParts[5] ?? '')

          let replacement
          if (importSource.charAt(0) !== '.') {
            // simplified replacement for external packages
            replacement = `module:${importSource}${
              exportName === 'default' ? '' : '~' + exportName
            }`
          } else {
            if (expression === lastExpression) {
              ++replaceAttempt
              if (replaceAttempt > 100) {
                // infinite loop protection
                throw new Error(
                  `Invalid docstring ${comment.value} in ${currentSourceName}.`
                )
              }
            } else {
              replaceAttempt = 0
            }
            lastExpression = expression
            const rel = path.resolve(
              path.dirname(currentSourceName),
              importSource
            )
            // default to js extension since .js extention is assumed implicitly
            const extension = getExtension(rel)
            const moduleId = path
              .relative(path.join(process.cwd(), moduleRoot), rel)
              .replace(extensionReplaceRegEx, '')
            if (getModuleInfo(moduleId, extension, parser)) {
              const name =
                exportName === 'default'
                  ? getDefaultExportName(moduleId, parser)
                  : exportName
              const delimiter =
                exportName === 'default'
                  ? '~'
                  : getDelimiter(moduleId, name, parser)
              replacement = `module:${moduleId.replace(slashRegEx, '/')}${
                name ? delimiter + name : ''
              }`
            }
          }
          if (replacement) {
            comment.value = comment.value.replace(
              expression,
              prefix + replacement + remainder
            )
          }
        }
      })
    }
  }
}

/*
// '$1module:$2.$3$4$5'
function typedTagsWithImportRepl(
  match,
  p1,
  p2,
  p3,
  p4,
  p5,
  offset,
  string,
  groups
) {
  p2 = p2.replace(/\.\.\//g, '') // strip relative path
  return (
    (p1 ?? '') + 'module:' + p2 + '.' + (p3 ?? '') + (p4 ?? '') + (p5 ?? '')
  )
}

exports.handlers = {
  beforeParse: function (event) {
    // Convert `import("path/to/module").export` to
    // `module:path/to/module.Name`
    event.source = event.source.replace(
      typedTagsWithImportRegEx,
      typedTagsWithImportRepl
    )
  }
}
*/
