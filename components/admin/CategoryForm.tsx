'use client'

import { useState, FormEvent } from 'react'
import type { Category } from '@/types'

interface Props {
  csrfToken: string
  onCreated: (cat: Category) => void
}

export default function CategoryForm({ csrfToken, onCreated }: Props) {
  const [form, setForm] = useState({ id: '', name: '', description: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true); setError('')
    const res = await fetch('/api/studio/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setSaving(false)
    if (res.ok) {
      onCreated(form as Category)
      setForm({ id: '', name: '', description: '' })
    } else {
      setError(data.error ?? '추가 실패')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-3">
      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">카테고리 추가</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">ID <span className="text-red-400">*</span> <span className="font-normal">(영문)</span></label>
          <input value={form.id} onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))} required placeholder="hormones" className="input-field" />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">이름 <span className="text-red-400">*</span></label>
          <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required placeholder="호르몬" className="input-field" />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">설명 <span className="text-zinc-400 font-normal">(선택)</span></label>
          <input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="설명..." className="input-field" />
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button type="submit" disabled={saving} className="px-4 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-700 disabled:opacity-50 transition-colors">
        {saving ? '추가 중...' : '추가'}
      </button>
    </form>
  )
}
