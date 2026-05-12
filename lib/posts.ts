import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '@/types'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(POSTS_DIR)
  return filenames
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        timeSlot: data.timeSlot as string,
        summary: data.summary as string,
        draft: (data.draft as boolean) ?? false,
      }
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): { meta: Post; content: string } | null {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  if (data.draft === true) return null
  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      timeSlot: data.timeSlot as string,
      summary: data.summary as string,
      draft: false,
    },
    content,
  }
}
