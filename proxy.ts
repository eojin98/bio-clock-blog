import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/admin/auth'

const LOGIN_PATH = '/studio'
const STUDIO_PREFIX = '/studio'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith(STUDIO_PREFIX)) return NextResponse.next()
  if (pathname === LOGIN_PATH) return NextResponse.next()

  const session = await getSessionFromRequest(req)
  if (!session?.authenticated) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = LOGIN_PATH
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio', '/studio/:path*'],
}
