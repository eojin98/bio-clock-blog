interface Props {
  children: React.ReactNode
  variant?: 'default' | 'indigo'
}

export default function Tag({ children, variant = 'default' }: Props) {
  const styles =
    variant === 'indigo'
      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'

  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${styles}`}>
      {children}
    </span>
  )
}
