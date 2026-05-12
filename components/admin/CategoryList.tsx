'use client'

import { useState } from 'react'
import type { Category, GitSyncResult } from '@/types'
import GitSyncStatus from './GitSyncStatus'

interface Props {
  initialCategories: Category[]
  csrfToken: string
  onChanged: (cats: Category[]) => void
}

export default function CategoryList({ initialCategories, csrfToken, onChanged }: Props) {
  const [categories, setCategories] = useState(initialCategories)
  const [gitResult, setGitResult] = useState<GitSyncResult | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState('')

  async function handleDelete(cat: Category) {
    setDeleteError('')
    const confirmed = confirm(`"${cat.name}" 카테고리를 삭제하시겠습니까?\n이 카테고리를 사용하는 글이 있으면 삭제되지 않습니다.`)
    if (!confirmed) return

    setDeletingId(cat.id)
    const res = await fetch(`/api/studio/categories/${cat.id}`, {
      method: 'DELETE',
      headers: { 'x-csrf-token': csrfToken },
    })
    const data = await res.json()
    setDeletingId(null)

    if (res.ok) {
      const next = categories.filter((c) => c.id !== cat.id)
      setCategories(next)
      onChanged(next)
      setGitResult(data.git)
    } else {
      setDeleteError(data.error ?? '삭제 실패')
    }
  }

  return (
    <div className="space-y-3">
      {categories.length === 0 && (
        <p className="text-sm text-zinc-400 dark:text-zinc-500">카테고리가 없습니다.</p>
      )}
      {categories.map((cat) => (
        <div key={cat.id} className="flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{cat.name}</span>
            <span className="ml-2 text-xs text-zinc-400 font-mono">#{cat.id}</span>
            {cat.description && <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{cat.description}</p>}
          </div>
          <button
            onClick={() => handleDelete(cat)}
            disabled={deletingId === cat.id}
            className="text-xs text-red-500 hover:underline disabled:opacity-50"
          >
            {deletingId === cat.id ? '...' : '삭제'}
          </button>
        </div>
      ))}
      {deleteError && <p className="text-xs text-red-500">{deleteError}</p>}
      <GitSyncStatus result={gitResult} />
    </div>
  )
}
