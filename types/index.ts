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
  draft?: boolean
}

export interface AdminPost extends Post {
  categories: string[]
  sourceTitle?: string
  sourceDOI?: string
  sourceUrl?: string
}

export interface Category {
  id: string
  name: string
  description: string
}

export interface GitSyncResult {
  fileWritten: boolean
  gitSynced: boolean
  gitError?: string
}
