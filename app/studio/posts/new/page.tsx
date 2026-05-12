import { redirect } from 'next/navigation'
import { getSession } from '@/lib/admin/auth'
import { readCategories } from '@/lib/admin/categories-storage'
import AdminNav from '@/components/admin/AdminNav'
import PostForm from '@/components/admin/PostForm'

export default async function NewPostPage() {
  const session = await getSession()
  if (!session?.authenticated) redirect('/studio')

  const categories = readCategories()
  const csrfToken = session.csrfToken

  return (
    <>
      <AdminNav currentPath="/studio/posts/new" />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">새 글 작성</h1>
        <PostForm mode="create" csrfToken={csrfToken} categories={categories} />
      </div>
    </>
  )
}
