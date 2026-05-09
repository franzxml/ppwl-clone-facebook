import type { FeedPost, PublicUser } from '@ppwl/shared'

export type { AppNotification, FeedPost, PublicUser } from '@ppwl/shared'
export type PostImage = FeedPost['images'][number]

export type PostComment = {
  id: string
  content: string
  author: PublicUser
  createdAt: string
  updatedAt: string
}
