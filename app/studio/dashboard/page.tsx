import { redirect } from 'next/navigation'
import { getSession } from '@/lib/admin/auth'
import { getAllPostsAdmin } from '@/lib/admin/posts-storage'
import AdminNav from '@/components/admin/AdminNav'
import DashboardClient from '@/components/admin/DashboardClient'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session?.authenticated) redirect('/studio')

  const posts = getAllPostsAdmin()
  const csrfToken = session.csrfToken

  return (
    <>
      <AdminNav currentPath="/studio/dashboard" />
      <DashboardClient initialPosts={posts} csrfToken={csrfToken} />
    </>
  )
}
