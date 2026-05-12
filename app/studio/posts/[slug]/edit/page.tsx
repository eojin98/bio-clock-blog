import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/admin/auth'
import { getPostContentAdmin, postExists } from '@/lib/admin/posts-storage'
import { readCategories } from '@/lib/admin/categories-storage'
import AdminNav from '@/components/admin/AdminNav'
import PostForm from '@/components/admin/PostForm'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function EditPostPage({ params }: Props) {
  const session = await getSession()
  if (!session?.authenticated) redirect('/studio')

  const { slug } = await params
  if (!postExists(slug)) notFound()

  const { meta, content } = getPostContentAdmin(slug)
  const categories = readCategories()
  const csrfToken = session.csrfToken

  return (
    <>
      <AdminNav />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">글 수정</h1>
        <PostForm
          mode="edit"
          csrfToken={csrfToken}
          categories={categories}
          initialData={{ ...meta, content }}
        />
      </div>
    </>
  )
}
