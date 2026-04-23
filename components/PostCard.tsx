import Link from 'next/link'
import type { Post } from '@/types'
import PostMeta from './PostMeta'

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block group rounded-xl border border-zinc-100 dark:border-zinc-800 p-5 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-sm transition-all"
    >
      <article>
        <div className="mb-2">
          <PostMeta date={post.date} timeSlot={post.timeSlot} />
        </div>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
          {post.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
          {post.summary}
        </p>
      </article>
    </Link>
  )
}
