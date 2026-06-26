import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sources = [
  'src/tokens.css',
  'src/base.css',
  'src/utilities.css',
  'src/layout/layout.css',
  'src/components/components.css',
]

const chunks = await Promise.all(sources.map((source) => readFile(resolve(root, source), 'utf8')))
await mkdir(resolve(root, 'dist'), { recursive: true })
await writeFile(resolve(root, 'dist/index.css'), `${chunks.join('\n\n')}\n`)
