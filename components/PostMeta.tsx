import Tag from './Tag'

interface Props {
  date: string
  timeSlot: string
}

export default function PostMeta({ date, timeSlot }: Props) {
  const formatted = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Tag variant="indigo">{timeSlot}</Tag>
      <time
        dateTime={date}
        className="text-xs text-zinc-400 dark:text-zinc-500"
      >
        {formatted}
      </time>
    </div>
  )
}
