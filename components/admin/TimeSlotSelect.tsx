'use client'

import timelineData from '@/data/timeline.json'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function TimeSlotSelect({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
        시간대 <span className="text-red-400">*</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">선택하세요</option>
        {timelineData.map((entry) => (
          <option key={entry.time} value={entry.time}>
            {entry.time} — {entry.title}
          </option>
        ))}
      </select>
    </div>
  )
}
