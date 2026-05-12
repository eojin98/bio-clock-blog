'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function MarkdownEditor({ value, onChange }: Props) {
  const [preview, setPreview] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          본문 <span className="text-red-400">*</span>
        </label>
        <button
          type="button"
          onClick={() => setPreview((p) => !p)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {preview ? '편집' : '미리보기'}
        </button>
      </div>

      {preview ? (
        <div className="min-h-64 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-auto">
          <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
            <ReactMarkdown>{value || '*내용을 입력해주세요*'}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          rows={16}
          placeholder="마크다운으로 글을 작성하세요..."
          className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-mono leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      )}
    </div>
  )
}
