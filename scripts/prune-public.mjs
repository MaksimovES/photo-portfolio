import { rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PUBLIC_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public')

await rm(PUBLIC_DIR, { recursive: true, force: true })
process.stdout.write('Removed public/ to free disk space (restore on next build via ensure-public).\n')
