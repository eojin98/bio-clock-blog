import { exec } from 'child_process'
import { promisify } from 'util'
import type { GitSyncResult } from '@/types'

const execAsync = promisify(exec)

export async function gitSync(commitMessage: string): Promise<GitSyncResult> {
  if (process.env.VERCEL) {
    return {
      fileWritten: true,
      gitSynced: false,
      gitError: 'Vercel 환경에서는 git push가 지원되지 않습니다. 로컬에서 작업해주세요.',
    }
  }

  try {
    await execAsync('git add .', { cwd: process.cwd() })
    await execAsync(`git commit -m "${commitMessage.replace(/"/g, "'")}"`, { cwd: process.cwd() })
    await execAsync('git push', { cwd: process.cwd() })
    return { fileWritten: true, gitSynced: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { fileWritten: true, gitSynced: false, gitError: msg }
  }
}
