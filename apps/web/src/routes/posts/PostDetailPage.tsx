import { MessageCircle, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/layouts/AppLayout'
import type { FeedPost, PostComment } from '@/types/social'

type PostDetailPageProps = {
  post: FeedPost
  comments: PostComment[]
}

export function PostDetailPage({ post, comments }: PostDetailPageProps) {
  return (
    <AppLayout>
      <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-950">{post.author.name}</h1>
            <p className="text-sm text-slate-500">{new Date(post.createdAt).toLocaleString('id-ID')}</p>
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-700">{post.content}</p>
        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
          <Button variant="secondary" className="flex-1 gap-2">
            <ThumbsUp className="size-4" aria-hidden="true" />
            {post._count.likes}
          </Button>
          <Button variant="secondary" className="flex-1 gap-2">
            <MessageCircle className="size-4" aria-hidden="true" />
            {post._count.comments}
          </Button>
        </div>
      </article>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-950">Komentar</h2>
        <div className="mt-4 space-y-4">
          {comments.map((comment) => (
            <article key={comment.id} className="rounded-md bg-slate-100 p-3">
              <h3 className="text-sm font-semibold text-slate-900">{comment.author.name}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-700">{comment.content}</p>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}
