import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from './PostCard'

export default function RecentPosts() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            최신 글
          </h2>
          <Link
            href="/posts"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
