import { NextRequest, NextResponse } from 'next/server'
import { validateCsrf, requireAuth } from '@/lib/admin/csrf'
import { getAllPostsAdmin, writePost, postExists } from '@/lib/admin/posts-storage'
import { gitSync } from '@/lib/admin/git-sync'
import type { AdminPost } from '@/types'

export async function GET(req: NextRequest) {
  const authErr = await requireAuth(req)
  if (authErr) return authErr
  return NextResponse.json(getAllPostsAdmin())
}

export async function POST(req: NextRequest) {
  const csrfErr = await validateCsrf(req)
  if (csrfErr) return csrfErr

  const body = (await req.json()) as Omit<AdminPost, 'slug'> & { slug: string; content: string }
  const { slug, content, ...meta } = body

  if (!slug || !meta.title) {
    return NextResponse.json({ error: 'slug and title are required' }, { status: 400 })
  }
  if (postExists(slug)) {
    return NextResponse.json({ error: `Post '${slug}' already exists` }, { status: 409 })
  }

  writePost(slug, meta, content)
  const isDraft = meta.draft ?? false
  const commitMsg = isDraft ? `draft: ${meta.title}` : `post: add ${meta.title}`
  const git = await gitSync(commitMsg)

  return NextResponse.json({ ok: true, git }, { status: 201 })
}
