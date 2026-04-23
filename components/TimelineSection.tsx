import timelineData from '@/data/timeline.json'
import type { TimelineEntry, TimelineGroup } from '@/types'
import TimelineTable from './TimelineTable'

const GROUP_DEFS: { label: string; emoji: string; start: number; end: number }[] = [
  { label: '새벽', emoji: '🌑', start: 0, end: 5 },
  { label: '오전', emoji: '🌅', start: 6, end: 11 },
  { label: '낮',   emoji: '☀️', start: 12, end: 14 },
  { label: '오후', emoji: '🌤', start: 15, end: 18 },
  { label: '저녁', emoji: '🌆', start: 19, end: 21 },
  { label: '밤',   emoji: '🌙', start: 22, end: 23 },
]

function getStartHour(time: string): number {
  return parseInt(time.split(':')[0], 10)
}

export default function TimelineSection() {
  const entries = timelineData as TimelineEntry[]

  const groups: TimelineGroup[] = GROUP_DEFS.map(({ label, emoji, start, end }) => ({
    label,
    emoji,
    entries: entries.filter((e) => {
      const h = getStartHour(e.time)
      return h >= start && h <= end
    }),
  }))

  return (
    <section className="py-12 px-4 border-b border-zinc-100 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          시간대별 과학 사실
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          행을 클릭하면 실천 팁과 과학적 출처를 확인할 수 있습니다.
        </p>
        <TimelineTable groups={groups} />
      </div>
    </section>
  )
}
