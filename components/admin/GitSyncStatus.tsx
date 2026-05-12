import type { GitSyncResult } from '@/types'

interface Props {
  result: GitSyncResult | null
}

export default function GitSyncStatus({ result }: Props) {
  if (!result) return null

  return (
    <div className="mt-3 space-y-1 text-xs">
      <div className={`flex items-center gap-1.5 ${result.fileWritten ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
        <span>{result.fileWritten ? '✓' : '✗'}</span>
        <span>파일 저장 {result.fileWritten ? '성공' : '실패'}</span>
      </div>
      <div className={`flex items-center gap-1.5 ${result.gitSynced ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
        <span>{result.gitSynced ? '✓' : '!'}</span>
        <span>git push {result.gitSynced ? '성공' : '건너뜀'}</span>
      </div>
      {result.gitError && (
        <p className="text-zinc-400 dark:text-zinc-500 pl-4 leading-relaxed">
          {result.gitError}
        </p>
      )}
    </div>
  )
}
