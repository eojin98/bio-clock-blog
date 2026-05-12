import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { AdminPost } from '@/types'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function toAdminPost(slug: string, data: Record<string, unknown>): AdminPost {
  return {
    slug,
    title: (data.title as string) ?? '',
    date: (data.date as string) ?? '',
    timeSlot: (data.timeSlot as string) ?? '',
    summary: (data.summary as string) ?? '',
    draft: (data.draft as boolean) ?? false,
    categories: (data.categories as string[]) ?? [],
    sourceTitle: data.sourceTitle as string | undefined,
    sourceDOI: data.sourceDOI as string | undefined,
    sourceUrl: data.sourceUrl as string | undefined,
  }
}

export function getAllPostsAdmin(): AdminPost[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
  return files.map((f) => {
    const slug = f.replace(/\.mdx$/, '')
    const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8'))
    return toAdminPost(slug, data)
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostContentAdmin(slug: string): { meta: AdminPost; content: string } {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), 'utf-8')
  const { data, content } = matter(raw)
  return { meta: toAdminPost(slug, data), content }
}

export function writePost(slug: string, meta: Omit<AdminPost, 'slug'>, content: string) {
  const frontmatter = matter.stringify(content, {
    title: meta.title,
    slug,
    date: meta.date,
    timeSlot: meta.timeSlot,
    categories: meta.categories,
    draft: meta.draft ?? false,
    ...(meta.summary && { summary: meta.summary }),
    ...(meta.sourceTitle && { sourceTitle: meta.sourceTitle }),
    ...(meta.sourceDOI && { sourceDOI: meta.sourceDOI }),
    ...(meta.sourceUrl && { sourceUrl: meta.sourceUrl }),
  })
  fs.mkdirSync(POSTS_DIR, { recursive: true })
  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.mdx`), frontmatter, 'utf-8')
}

export function deletePost(slug: string) {
  const target = path.join(POSTS_DIR, `${slug}.mdx`)
  if (fs.existsSync(target)) fs.unlinkSync(target)
}

export function postExists(slug: string): boolean {
  return fs.existsSync(path.join(POSTS_DIR, `${slug}.mdx`))
}
