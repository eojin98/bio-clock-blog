'use client'

import { useState } from 'react'
import type { TimelineEntry } from '@/types'
import TimelineRow from './TimelineRow'

interface Props {
  entries: TimelineEntry[]
}

export default function TimelineTable({ entries }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleToggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide w-32">
              시간대
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
              주요 현상
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide hidden sm:table-cell">
              설명
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <TimelineRow
              key={entry.time}
              entry={entry}
              isExpanded={expandedIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
