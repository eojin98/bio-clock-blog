import { NextRequest, NextResponse } from 'next/server'
import { validateCsrf } from '@/lib/admin/csrf'
import { getPostContentAdmin, writePost, deletePost, postExists } from '@/lib/admin/posts-storage'
import { gitSync } from '@/lib/admin/git-sync'
import type { AdminPost } from '@/types'

interface Context { params: Promise<{ slug: string }> }

export async function PUT(req: NextRequest, { params }: Context) {
  const csrfErr = await validateCsrf(req)
  if (csrfErr) return csrfErr

  const { slug } = await params
  if (!postExists(slug)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const body = (await req.json()) as Omit<AdminPost, 'slug'> & { content: string }
  const { content, ...meta } = body

  writePost(slug, meta, content)
  const isDraft = meta.draft ?? false
  const commitMsg = isDraft ? `draft: ${meta.title}` : `post: update ${meta.title}`
  const git = await gitSync(commitMsg)

  return NextResponse.json({ ok: true, git })
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const csrfErr = await validateCsrf(req)
  if (csrfErr) return csrfErr

  const { slug } = await params
  if (!postExists(slug)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const { meta } = getPostContentAdmin(slug)
  deletePost(slug)
  const git = await gitSync(`post: remove ${meta.title}`)

  return NextResponse.json({ ok: true, git })
}
