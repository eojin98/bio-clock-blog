import fs from 'fs'
import path from 'path'
import type { Category } from '@/types'

const FILE = path.join(process.cwd(), 'data', 'categories.json')

export function readCategories(): Category[] {
  if (!fs.existsSync(FILE)) return []
  return JSON.parse(fs.readFileSync(FILE, 'utf-8')) as Category[]
}

export function writeCategories(categories: Category[]) {
  fs.writeFileSync(FILE, JSON.stringify(categories, null, 2), 'utf-8')
}

export function addCategory(category: Category): { ok: boolean; error?: string } {
  const cats = readCategories()
  if (cats.find((c) => c.id === category.id)) {
    return { ok: false, error: `ID '${category.id}' already exists` }
  }
  writeCategories([...cats, category])
  return { ok: true }
}

export function updateCategory(id: string, data: Partial<Omit<Category, 'id'>>): boolean {
  const cats = readCategories()
  const idx = cats.findIndex((c) => c.id === id)
  if (idx === -1) return false
  cats[idx] = { ...cats[idx], ...data }
  writeCategories(cats)
  return true
}

export function deleteCategory(id: string): boolean {
  const cats = readCategories()
  const next = cats.filter((c) => c.id !== id)
  if (next.length === cats.length) return false
  writeCategories(next)
  return true
}
