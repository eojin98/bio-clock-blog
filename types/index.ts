export interface TimelineEntry {
  time: string
  title: string
  summary: string
  tip: string
  source: string
  relatedPosts: string[]
}

export interface TimelineGroup {
  label: string
  emoji: string
  entries: TimelineEntry[]
}

export interface Post {
  slug: string
  title: string
  date: string
  timeSlot: string
  summary: string
}
