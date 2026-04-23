export interface TimelineEntry {
  time: string
  title: string
  description: string
  slugs: string[]
}

export interface Post {
  slug: string
  title: string
  date: string
  timeSlot: string
  summary: string
}
