'use client'

import type { Category } from '@/types'

interface Props {
  categories: Category[]
  selected: string[]
  onChange: (ids: string[]) => void
}

export default function CategoryCheckboxes({ categories, selected, onChange }: Props) {
  function toggle(id: string) {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    )
  }

  return (
    <div>
      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
        카테고리 <span className="text-zinc-400 text-xs font-normal">(선택)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <label
            key={cat.id}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(cat.id)}
              onChange={() => toggle(cat.id)}
              className="rounded border-zinc-300 dark:border-zinc-600 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">{cat.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
