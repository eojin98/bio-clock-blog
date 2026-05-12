import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import PostMeta from '@/components/PostMeta'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const result = getPostBySlug(slug)
  if (!result) return {}
  return { title: result.meta.title, description: result.meta.summary }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const result = getPostBySlug(slug)
  if (!result) notFound()

  const { meta, content } = result

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 mb-8 transition-colors"
      >
        ← 홈으로
      </Link>
      <header className="mb-8">
        <div className="mb-3">
          <PostMeta date={meta.date} timeSlot={meta.timeSlot} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
          {meta.title}
        </h1>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-base">{meta.summary}</p>
      </header>
      <hr className="border-zinc-100 dark:border-zinc-800 mb-8" />
      <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
        <MDXRemote source={content} />
      </article>
    </div>
  )
}
