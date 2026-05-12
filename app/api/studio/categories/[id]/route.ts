import { NextRequest, NextResponse } from 'next/server'
import { validateCsrf } from '@/lib/admin/csrf'
import { updateCategory, deleteCategory } from '@/lib/admin/categories-storage'
import { getAllPostsAdmin } from '@/lib/admin/posts-storage'
import { gitSync } from '@/lib/admin/git-sync'

interface Context { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Context) {
  const csrfErr = await validateCsrf(req)
  if (csrfErr) return csrfErr

  const { id } = await params
  const body = await req.json()
  const ok = updateCategory(id, body)
  if (!ok) return NextResponse.json({ error: 'Category not found' }, { status: 404 })

  const git = await gitSync(`category: update ${body.name ?? id}`)
  return NextResponse.json({ ok: true, git })
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const csrfErr = await validateCsrf(req)
  if (csrfErr) return csrfErr

  const { id } = await params
  const usedBy = getAllPostsAdmin().filter((p) => p.categories.includes(id))
  if (usedBy.length > 0) {
    return NextResponse.json(
      { error: `이 카테고리를 사용하는 글이 ${usedBy.length}개 있습니다.`, usedBy },
      { status: 409 }
    )
  }

  const ok = deleteCategory(id)
  if (!ok) return NextResponse.json({ error: 'Category not found' }, { status: 404 })

  const git = await gitSync(`category: remove ${id}`)
  return NextResponse.json({ ok: true, git })
}
