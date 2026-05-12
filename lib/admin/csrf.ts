import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from './auth'

export async function validateCsrf(req: NextRequest): Promise<NextResponse | null> {
  const session = await getSessionFromRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const headerToken = req.headers.get('x-csrf-token')
  if (!headerToken || headerToken !== session.csrfToken) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
  }

  return null // validation passed
}

export async function requireAuth(req: NextRequest): Promise<NextResponse | null> {
  const session = await getSessionFromRequest(req)
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
