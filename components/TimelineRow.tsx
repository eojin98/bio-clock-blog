'use client'

import Link from 'next/link'
import type { TimelineEntry } from '@/types'

interface Props {
  entry: TimelineEntry
  isExpanded: boolean
  onToggle: () => void
}

export default function TimelineRow({ entry, isExpanded, onToggle }: Props) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer transition-colors"
      >
        <td className="py-3 px-4 font-mono text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
          {entry.time}
        </td>
        <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">
          {entry.title}
          <span className="ml-2 text-zinc-300 dark:text-zinc-600 text-xs select-none">
            {isExpanded ? '▲' : '▼'}
          </span>
        </td>
        <td className="py-3 px-4 text-sm text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">
          {entry.description}
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-zinc-50 dark:bg-zinc-900/50">
          <td colSpan={3} className="px-4 py-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2 sm:hidden">
              {entry.description}
            </p>
            {entry.slugs.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-400 dark:text-zinc-500">관련 글</span>
                {entry.slugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/posts/${slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors"
                  >
                    {slug}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 dark:text-zinc-500">관련 글이 준비 중입니다.</p>
            )}
          </td>
        </tr>
      )}
    </>
  )
}
