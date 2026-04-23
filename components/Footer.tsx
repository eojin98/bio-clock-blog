export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800 py-8 px-4 text-center">
      <p className="text-sm text-zinc-400 dark:text-zinc-600">
        © {new Date().getFullYear()} 생체시계 블로그 — Circadian Rhythm Science
      </p>
    </footer>
  )
}
