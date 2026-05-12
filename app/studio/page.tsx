import { redirect } from 'next/navigation'
import { getSession } from '@/lib/admin/auth'
import LoginForm from '@/components/admin/LoginForm'

export default async function StudioLoginPage() {
  const session = await getSession()
  if (session?.authenticated) redirect('/studio/dashboard')
  return <LoginForm />
}
