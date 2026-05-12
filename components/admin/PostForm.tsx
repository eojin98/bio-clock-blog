'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { AdminPost, Category, GitSyncResult } from '@/types'
import TimeSlotSelect from './TimeSlotSelect'
import CategoryCheckboxes from './CategoryCheckboxes'
import MarkdownEditor from './MarkdownEditor'
import GitSyncStatus from './GitSyncStatus'

interface Props {
  csrfToken: string
  categories: Category[]
  initialData?: AdminPost & { content: string }
  mode: 'create' | 'edit'
}

const EMPTY: AdminPost & { content: string } = {
  slug: '', title: '', date: new Date().toISOString().slice(0, 10),
  timeSlot: '', summary: '', draft: true, categories: [],
  sourceTitle: '', sourceDOI: '', sourceUrl: '', content: '',
}

export default function PostForm({ csrfToken, categories, initialData, mode }: Props) {
  const [form, setForm] = useState(initialData ?? EMPTY)
  const [saving, setSaving] = useState(false)
  const [gitResult, setGitResult] = useState<GitSyncResult | null>(null)
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()

  function set<K extends keyof typeof form>(key: K, val: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: val }))
  }

  async function save(draft: boolean) {
    setSaving(true); setSubmitError(''); setGitResult(null)
    const url = mode === 'create' ? '/api/studio/posts' : `/api/studio/posts/${form.slug}`
    const method = mode === 'create' ? 'POST' : 'PUT'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
      body: JSON.stringify({ ...form, draft }),
    })
    const data = await res.json()
    setSaving(false)
    if (res.ok) {
      setGitResult(data.git)
      if (!data.git?.gitError) router.push('/studio/dashboard')
    } else {
      setSubmitError(data.error ?? '저장 실패')
    }
  }

  function handleSubmit(e: FormEvent, draft: boolean) {
    e.preventDefault(); save(draft)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, form.draft ?? true)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            슬러그 <span className="text-red-400">*</span>
            <span className="text-zinc-400 font-normal ml-1">(URL 경로, 영문-숫자-하이픈)</span>
          </label>
          <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required readOnly={mode === 'edit'}
            placeholder="my-post-slug" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            제목 <span className="text-red-400">*</span>
          </label>
          <input value={form.title} onChange={(e) => set('title', e.target.value)} required
            placeholder="글 제목" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">날짜 <span className="text-red-400">*</span></label>
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} required className="input-field" />
        </div>
        <TimeSlotSelect value={form.timeSlot} onChange={(v) => set('timeSlot', v)} />
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
          요약 <span className="text-zinc-400 font-normal">(선택 — 목록에 표시)</span>
        </label>
        <textarea value={form.summary ?? ''} onChange={(e) => set('summary', e.target.value)}
          rows={2} placeholder="글 요약..." className="input-field resize-none" />
      </div>

      <CategoryCheckboxes categories={categories} selected={form.categories} onChange={(v) => set('categories', v)} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">출처 제목 <span className="text-zinc-400 font-normal">(선택)</span></label>
          <input value={form.sourceTitle ?? ''} onChange={(e) => set('sourceTitle', e.target.value)} placeholder="논문 제목" className="input-field" /></div>
        <div><label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">DOI <span className="text-zinc-400 font-normal">(선택)</span></label>
          <input value={form.sourceDOI ?? ''} onChange={(e) => set('sourceDOI', e.target.value)} placeholder="10.xxxx/xxxxx" className="input-field" /></div>
        <div><label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">URL <span className="text-zinc-400 font-normal">(선택)</span></label>
          <input value={form.sourceUrl ?? ''} onChange={(e) => set('sourceUrl', e.target.value)} placeholder="https://..." className="input-field" /></div>
      </div>

      <MarkdownEditor value={form.content} onChange={(v) => set('content', v)} />

      {submitError && <p className="text-sm text-red-500">{submitError}</p>}
      <GitSyncStatus result={gitResult} />

      <div className="flex items-center gap-3 pt-2">
        <button type="button" onClick={() => save(true)} disabled={saving}
          className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors">
          {saving ? '저장 중...' : '초안으로 저장'}
        </button>
        <button type="button" onClick={() => save(false)} disabled={saving}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          {saving ? '저장 중...' : '공개 발행'}
        </button>
        <button type="button" onClick={() => router.push('/studio/dashboard')}
          className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
          취소
        </button>
      </div>
    </form>
  )
}
