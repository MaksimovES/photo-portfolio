import { access, readdir } from 'node:fs/promises'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC_DIR = path.join(ROOT, 'public')
const SOURCE_RE = /\.(jpe?g|png)$/i

async function hasSourceImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (await hasSourceImages(fullPath)) return true
    } else if (SOURCE_RE.test(entry.name)) {
      return true
    }
  }
  return false
}

async function publicNeedsRestore() {
  try {
    await access(PUBLIC_DIR)
  } catch {
    return true
  }
  return !(await hasSourceImages(PUBLIC_DIR))
}

function restorePublicFromGit() {
  const commands = [
    'git restore --source=HEAD --worktree -- public',
    'git checkout HEAD -- public',
  ]

  for (const command of commands) {
    try {
      execSync(command, { cwd: ROOT, stdio: 'pipe' })
      return
    } catch {
      // try older git syntax
    }
  }

  throw new Error('Could not restore public/ from git. Run: git restore public')
}

async function main() {
  if (!(await publicNeedsRestore())) return

  process.stdout.write('public/ is missing — restoring tracked files from git...\n')
  restorePublicFromGit()

  if (!(await hasSourceImages(PUBLIC_DIR))) {
    throw new Error('public/ restored but contains no source images (JPG/PNG).')
  }

  process.stdout.write('public/ restored.\n')
}

main().catch(err => {
  console.error(err.message ?? err)
  process.exit(1)
})
