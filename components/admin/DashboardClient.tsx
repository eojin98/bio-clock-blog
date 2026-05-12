'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { AdminPost } from '@/types'
import PostsTable from './PostsTable'

interface Props {
  initialPosts: AdminPost[]
  csrfToken: string
}

export default function DashboardClient({ initialPosts, csrfToken }: Props) {
  const [posts, setPosts] = useState(initialPosts)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">글 목록</h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-0.5">총 {posts.length}개</p>
        </div>
        <Link
          href="/studio/posts/new"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          + 새 글
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 dark:text-zinc-500">
          <p className="text-sm">글이 없습니다.</p>
          <Link href="/studio/posts/new" className="text-indigo-500 text-sm hover:underline mt-2 inline-block">
            첫 글 작성하기 →
          </Link>
        </div>
      ) : (
        <PostsTable
          posts={posts}
          csrfToken={csrfToken}
          onDelete={(slug) => setPosts((prev) => prev.filter((p) => p.slug !== slug))}
        />
      )}
    </div>
  )
}
