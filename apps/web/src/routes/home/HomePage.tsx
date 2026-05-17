// [Khairunnisa] Tambah useState untuk keperluan modal detail postingan
import { useState } from 'react'
import { Image, Send } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/layouts/AppLayout'
import type { FeedPost } from '@/types/social'
// [Khairunnisa] Tambah import PostDetailPage dari fitur komentar & detail postingan
import { PostDetailPage } from '@/routes/posts/PostDetailPage'

type HomePageProps = {
  posts: FeedPost[]
  aside?: ReactNode
}

export function HomePage({ posts, aside }: HomePageProps) {
  // [Khairunnisa] State untuk menyimpan postingan yang dipilih, dipakai untuk buka modal
  // Kalau selectedPost tidak null, modal akan muncul
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null)

  return (
    <AppLayout aside={aside}>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            F
          </div>
          <button className="h-10 flex-1 rounded-full bg-slate-100 px-4 text-left text-sm text-slate-500 transition-colors hover:bg-slate-200">
            Apa yang sedang Anda pikirkan?
          </button>
        </div>
        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
          <Button variant="secondary" className="flex-1 gap-2">
            <Image className="size-4" aria-hidden="true" />
            Foto
          </Button>
          <Button className="flex-1 gap-2">
            <Send className="size-4" aria-hidden="true" />
            Posting
          </Button>
        </div>
      </div>

      {posts.map((post) => (
        // [Khairunnisa] Tambah onClick dan cursor-pointer di article
        // Wen, kalau mau redesign card, pastikan onClick tetap ada di sini ya
        <article
          key={post.id}
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm cursor-pointer"
          onClick={() => setSelectedPost(post)}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-950">{post.author.name}</h2>
              <p className="text-sm text-slate-500">{new Date(post.createdAt).toLocaleString('id-ID')}</p>
            </div>
          </div>
          <p className="mt-4 leading-7 text-slate-700">{post.content}</p>
        </article>
      ))}

      {/* [Khairunnisa] Modal detail postingan + komentar — jangan dihapus ya Wen!
          Modal ini muncul otomatis saat salah satu postingan diklik.
          Kalau mau redesign card, cukup jaga onClick di article dan bagian modal ini. */}
      {selectedPost && (
        <PostDetailPage post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </AppLayout>
  )
}