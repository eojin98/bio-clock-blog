import timelineData from '@/data/timeline.json'
import type { TimelineEntry } from '@/types'
import TimelineTable from './TimelineTable'

export default function TimelineSection() {
  const entries = timelineData as TimelineEntry[]

  return (
    <section className="py-12 px-4 border-b border-zinc-100 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          시간대별 과학 사실
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          각 행을 클릭하면 관련 글로 이동할 수 있습니다.
        </p>
        <TimelineTable entries={entries} />
      </div>
    </section>
  )
}
