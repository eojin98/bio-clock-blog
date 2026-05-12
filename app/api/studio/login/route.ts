import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createSession, setSessionCookie } from '@/lib/admin/auth'
import { checkRateLimit, resetRateLimit } from '@/lib/admin/rate-limit'

const HASH = process.env.ADMIN_PASSWORD_HASH

export async function POST(req: NextRequest) {
  if (!HASH) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json(
      { error: '로그인 시도가 너무 많습니다. 1분 후 다시 시도해주세요.' },
      { status: 429 }
    )
  }

  let password: string
  try {
    const body = await req.json()
    password = body.password
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const match = await bcrypt.compare(password, HASH)
  if (!match) {
    return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 })
  }

  resetRateLimit(ip)
  const token = await createSession()
  const res = NextResponse.json({ ok: true })
  setSessionCookie(res, token)
  return res
}
