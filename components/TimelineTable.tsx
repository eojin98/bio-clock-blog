'use client'

import { useState } from 'react'
import type { TimelineGroup } from '@/types'
import TimelineRow from './TimelineRow'

const GROUP_HEADER_STYLES: Record<string, string> = {
  '새벽': 'bg-indigo-50  dark:bg-indigo-950/40  text-indigo-600  dark:text-indigo-300',
  '오전': 'bg-amber-50   dark:bg-amber-950/40   text-amber-700   dark:text-amber-300',
  '낮':   'bg-sky-50     dark:bg-sky-950/40     text-sky-600     dark:text-sky-300',
  '오후': 'bg-orange-50  dark:bg-orange-950/40  text-orange-600  dark:text-orange-300',
  '저녁': 'bg-rose-50    dark:bg-rose-950/40    text-rose-600    dark:text-rose-300',
  '밤':   'bg-violet-50  dark:bg-violet-950/40  text-violet-600  dark:text-violet-300',
}

interface Props {
  groups: TimelineGroup[]
}

export default function TimelineTable({ groups }: Props) {
  const [expandedKey, setExpandedKey] = useState<string | null>(null)

  const handleToggle = (time: string) =>
    setExpandedKey((prev) => (prev === time ? null : time))

  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <div
          key={group.label}
          className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b border-zinc-200 dark:border-zinc-800 ${GROUP_HEADER_STYLES[group.label] ?? ''}`}>
                <th colSpan={3} className="py-2 px-4 text-left text-xs font-bold uppercase tracking-wider">
                  {group.emoji} {group.label}
                </th>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <th className="py-2 px-4 text-left text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide w-28">시간</th>
                <th className="py-2 px-4 text-left text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide">주요 현상</th>
                <th className="py-2 px-4 text-left text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide hidden sm:table-cell">요약</th>
              </tr>
            </thead>
            <tbody>
              {group.entries.map((entry) => (
                <TimelineRow
                  key={entry.time}
                  entry={entry}
                  isExpanded={expandedKey === entry.time}
                  onToggle={() => handleToggle(entry.time)}
                />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
