import Link from 'next/link'
import LogoutButton from './LogoutButton'

interface NavItem { href: string; label: string }

const NAV: NavItem[] = [
  { href: '/studio/dashboard', label: '글 목록' },
  { href: '/studio/posts/new', label: '새 글' },
  { href: '/studio/categories', label: '카테고리' },
]

interface Props {
  currentPath?: string
}

export default function AdminNav({ currentPath }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur border-b border-zinc-100 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                currentPath === href
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </div>
    </header>
  )
}
