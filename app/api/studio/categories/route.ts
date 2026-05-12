import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, validateCsrf } from '@/lib/admin/csrf'
import { readCategories, addCategory } from '@/lib/admin/categories-storage'
import { gitSync } from '@/lib/admin/git-sync'
import type { Category } from '@/types'

export async function GET(req: NextRequest) {
  const authErr = await requireAuth(req)
  if (authErr) return authErr
  return NextResponse.json(readCategories())
}

export async function POST(req: NextRequest) {
  const csrfErr = await validateCsrf(req)
  if (csrfErr) return csrfErr

  const body = (await req.json()) as Category
  if (!body.id || !body.name) {
    return NextResponse.json({ error: 'id and name are required' }, { status: 400 })
  }

  const result = addCategory(body)
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 })
  }

  const git = await gitSync(`category: add ${body.name}`)
  return NextResponse.json({ ok: true, git }, { status: 201 })
}
