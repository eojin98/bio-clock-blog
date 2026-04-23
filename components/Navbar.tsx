import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-100 dark:border-zinc-800">
      <nav className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-zinc-900 dark:text-zinc-50 hover:opacity-75 transition-opacity"
        >
          🕐 생체시계
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            홈
          </Link>
          <Link
            href="/posts"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            글 목록
          </Link>
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  )
}
