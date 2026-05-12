import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/admin/auth'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ csrfToken: session.csrfToken })
}
