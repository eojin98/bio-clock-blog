'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { AdminPost } from '@/types'

type SortKey = 'date' | 'title'

interface Props {
  posts: AdminPost[]
  csrfToken: string
  onDelete: (slug: string) => void
}

export default function PostsTable({ posts, csrfToken, onDelete }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortAsc, setSortAsc] = useState(false)

  const sorted = [...posts].sort((a, b) => {
    const va = sortKey === 'date' ? a.date : a.title
    const vb = sortKey === 'date' ? b.date : b.title
    return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va)
  })

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((p) => !p)
    else { setSortKey(key); setSortAsc(false) }
  }

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`"${title}" 글을 삭제하시겠습니까?`)) return
    const res = await fetch(`/api/studio/posts/${slug}`, {
      method: 'DELETE',
      headers: { 'x-csrf-token': csrfToken },
    })
    if (res.ok) onDelete(slug)
    else alert('삭제에 실패했습니다.')
  }

  const arrow = (key: SortKey) => sortKey === key ? (sortAsc ? '↑' : '↓') : ''

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-zinc-500 dark:text-zinc-400">상태</th>
            <th className="py-3 px-4 text-left cursor-pointer select-none text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200" onClick={() => toggleSort('title')}>
              제목 {arrow('title')}
            </th>
            <th className="py-3 px-4 text-left cursor-pointer select-none text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hidden sm:table-cell" onClick={() => toggleSort('date')}>
              날짜 {arrow('date')}
            </th>
            <th className="py-3 px-4 text-left font-semibold text-zinc-500 dark:text-zinc-400 hidden md:table-cell">카테고리</th>
            <th className="py-3 px-4" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((post) => (
            <tr key={post.slug} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
              <td className="py-3 px-4">
                {post.draft
                  ? <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">초안</span>
                  : <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">공개</span>
                }
              </td>
              <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">{post.title}</td>
              <td className="py-3 px-4 text-zinc-400 hidden sm:table-cell">{post.date}</td>
              <td className="py-3 px-4 text-zinc-400 hidden md:table-cell">{post.categories.join(', ')}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2 justify-end">
                  <Link href={`/studio/posts/${post.slug}/edit`} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">수정</Link>
                  <button onClick={() => handleDelete(post.slug, post.title)} className="text-xs text-red-500 hover:underline">삭제</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
