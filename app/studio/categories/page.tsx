'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import type { Category } from '@/types'
import AdminNav from '@/components/admin/AdminNav'
import CategoryList from '@/components/admin/CategoryList'
import CategoryForm from '@/components/admin/CategoryForm'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [csrfToken, setCsrfToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/studio/categories').then((r) => r.json()),
      fetch('/api/studio/csrf-token').then((r) => r.json()),
    ]).then(([cats, csrf]) => {
      setCategories(cats)
      setCsrfToken(csrf.csrfToken ?? '')
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <>
      <AdminNav currentPath="/studio/categories" />
      <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-zinc-400">불러오는 중...</div>
    </>
  )

  return (
    <>
      <AdminNav currentPath="/studio/categories" />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">카테고리 관리</h1>
        <CategoryList
          initialCategories={categories}
          csrfToken={csrfToken}
          onChanged={setCategories}
        />
        <CategoryForm
          csrfToken={csrfToken}
          onCreated={(cat) => setCategories((prev) => [...prev, cat])}
        />
      </div>
    </>
  )
}
