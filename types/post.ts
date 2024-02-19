export interface IPost {
  title: string
  weight: number
  toc: {
    content: string
    slug: string
    lvl: number
    i: number
    seen: number
  }[]
  readingTime?: number
  excerpt?: string
  sectionSlug: string
  sectionWeight: number
  sectionTitle: string
  rootSectionId?: string
  id: string
  isIndex?: boolean
  slug: string
  nextPage?: {
    title: string
    href: string
  }
  prevPage?: {
    title: string
    href: string
  }
}