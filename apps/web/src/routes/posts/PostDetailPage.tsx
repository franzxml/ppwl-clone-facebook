import { useEffect, useRef, useState } from 'react'
import type { FeedPost, PostComment } from '@/types/social'

// ─── Dummy Comments ──────────────────────────────────────────────────────────
const DUMMY_COMMENTS: PostComment[] = [
  {
    id: 'c1',
    content: 'Semangat semuanya! Pasti bisa 💪',
    author: { id: 'user-2', name: 'Dzaky Mubarak', email: 'dzaky@example.com', avatarUrl: null },
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: 'c2',
    content: 'Ayo kita kerjain bareng-bareng biar cepet selesai!',
    author: { id: 'user-3', name: 'Ghina Audhiya', email: 'ghina@example.com', avatarUrl: null },
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: 'c3',
    content: 'Mantap! Frontend udah mulai keliatan nih 🔥',
    author: { id: 'user-4', name: 'Florecita Wenny', email: 'florecita@example.com', avatarUrl: null },
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
]

const MAX_COMMENTS = 5

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '1 mnt'
  if (minutes < 60) return `${minutes} mnt`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} jam`
  return `${Math.floor(hours / 24)} hari`
}

function formatCount(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.', ',').replace(',0', '') + ' rb'
  }
  return num.toString()
}

// ─── PURE SVG ICONS (Sesuai Mockup Gambar Asli) ──────────────────────────────

function CustomLikeIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? '#1877F2' : 'none'} stroke={filled ? '#1877F2' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  )
}

// Lingkaran chat presisi sesuai tangkapan layar Facebook asli
function CustomCommentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

// ─── Komponen Avatar Bulat Sesuai Token Warna Utama Tim 4 ───────────────────
function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'size-8 text-xs' : 'size-10 text-sm'
  return (
    <div
      className={`${sizeClass} flex items-center justify-center rounded-full flex-shrink-0 font-bold text-white select-none`}
      style={{ backgroundColor: '#1877F2' }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

type PostDetailPageProps = {
  post: FeedPost
  onClose: () => void
}

export function PostDetailPage({ post, onClose }: PostDetailPageProps) {
  const [comments, setComments] = useState<PostComment[]>(DUMMY_COMMENTS)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post._count.likes || 8)
  const [commentInput, setCommentInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleLike() {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  function handleSubmitComment() {
    if (!commentInput.trim() || isSubmitting || comments.length >= MAX_COMMENTS) return
    setIsSubmitting(true)
    
    setTimeout(() => {
      const newComment: PostComment = {
        id: `c-${Date.now()}`,
        content: commentInput.trim(),
        author: { id: 'me', name: 'Khairunnisa', email: 'khrnsa@example.com', avatarUrl: null },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setComments((prev) => [...prev, newComment])
      setCommentInput('')
      setIsSubmitting(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }, 150)
  }

  const isAtLimit = comments.length >= MAX_COMMENTS

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-[650px] max-h-[92vh] bg-white overflow-hidden"
        style={{ 
          boxShadow: '0 12px 28px rgba(0,0,0,0.18)', 
          fontFamily: 'Arial, system-ui, Helvetica, sans-serif', 
          borderRadius: '12px' 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div
          className="flex items-center justify-center px-4 py-[14px] relative flex-shrink-0"
          style={{ borderBottom: '1px solid #DADDE1' }}
        >
          <h2 style={{ color: '#050505', fontSize: '17px', fontWeight: 700 }}>
            Postingan {post.author.name}
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 flex items-center justify-center size-[32px] rounded-full transition-colors focus:outline-none"
            style={{ backgroundColor: '#F0F2F5' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E4E6EB')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F0F2F5')}
            aria-label="Tutup"
          >
            <span style={{ color: '#050505', fontSize: '15px', fontWeight: 600 }}>✕</span>
          </button>
        </div>

        {/* Area Konten Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Post Header */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-2">
            <Avatar name={post.author.name} size="md" />
            <div>
              <p style={{ color: '#050505', fontSize: '15px', fontWeight: 600, lineHeight: '1.2' }}>
                {post.author.name}
              </p>
              <p style={{ color: '#65676B', fontSize: '12px', marginTop: '3px' }} className="flex items-center gap-1">
                9 Mei · <span style={{ fontSize: '12px' }}>🌐</span>
              </p>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-4">
            <p style={{ color: '#050505', fontSize: '15px', lineHeight: '1.45' }}>
              {post.content}
            </p>
          </div>

          {/* BAR IKON INTERAKSI UTAMA */}
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ 
              borderTop: '1px solid #DADDE1', 
              borderBottom: '1px solid #DADDE1' 
            }}
          >
            {/* Sisi Kiri: Pasangan Ikon dan Angka Saja */}
            <div className="flex items-center gap-5">
              {/* Suka */}
              <button onClick={handleLike} className="flex items-center gap-1.5 focus:outline-none hover:opacity-70 py-0.5">
                <CustomLikeIcon className="size-[20px]" filled={liked} style={{ color: liked ? '#1877F2' : '#65676B' }} />
                <span style={{ color: '#65676B', fontSize: '14px', fontWeight: 400 }}>{formatCount(likeCount)}</span>
              </button>
              {/* Komentar */}
              <button onClick={() => !isAtLimit && inputRef.current?.focus()} className="flex items-center gap-1.5 focus:outline-none hover:opacity-70 py-0.5">
                <CustomCommentIcon className="size-[20px]" style={{ color: '#65676B' }} />
                <span style={{ color: '#65676B', fontSize: '14px', fontWeight: 400 }}>{formatCount(comments.length)}</span>
              </button>
              {/* Bagikan */}
              <button className="flex items-center gap-1.5 focus:outline-none hover:opacity-70 py-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[20px]" style={{ color: '#65676B' }}>
                  <path d="M16 5l6 6-6 6" />
                  <path d="M4 19c0-6 4.5-10 12-10" />
                </svg>
                <span style={{ color: '#65676B', fontSize: '14px', fontWeight: 400 }}>{formatCount(post._count.shares || 4)}</span>
              </button>
            </div>

            {/* Sisi Kanan: Tumpukan Lencana Reaksi Ringkas */}
            <div className="flex items-center -space-x-1 select-none">
              <div className="flex items-center justify-center size-[18px] rounded-full bg-[#1877F2] text-white text-[10px] shadow-sm">👍</div>
              <div className="flex items-center justify-center size-[18px] rounded-full bg-[#F7B928] text-[10px] shadow-sm">😆</div>
            </div>
          </div>

          {/* Tombol Filter Komentar "Paling Relevan" */}
          <div className="px-4 pt-2 pb-1 flex items-center">
            <button className="flex items-center gap-1 text-[14px] font-semibold text-[#65676B] hover:bg-[#F2F3F5] px-2 py-1 rounded-md transition-colors focus:outline-none">
              Paling relevan <span className="text-[10px] text-[#65676B] translate-y-[1px]">▼</span>
            </button>
          </div>

          {/* Area Daftar Komentar */}
          <div className="px-4 py-2 space-y-3.5">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2.5 items-start group">
                <Avatar name={comment.author.name} size="sm" />
                <div className="flex flex-col flex-1 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    {/* Kotak Bubble Komentar */}
                    <div className="rounded-[18px] px-3 py-2 bg-[#F0F2F5] inline-block">
                      <p style={{ color: '#050505', fontSize: '13px', fontWeight: 700, lineHeight: '1.2' }}>
                        {comment.author.name}
                      </p>
                      <p style={{ color: '#050505', fontSize: '14px', lineHeight: '1.4', marginTop: '2px' }}>
                        {comment.content}
                      </p>
                    </div>

                    {/* Tombol Titik Tiga (...) Opsi di Samping Bubble */}
                    <button className="opacity-0 group-hover:opacity-100 flex items-center justify-center size-7 rounded-full hover:bg-[#F2F3F5] text-[#65676B] font-bold text-xs transition-opacity focus:outline-none">
                      •••
                    </button>
                  </div>

                  {/* Metadata Komentar */}
                  <p className="px-2 mt-1 text-[12px] style={{ color: '#65676B' }}">
                    {formatRelativeTime(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Input Komentar di Bagian Bawah */}
        <div
          className="flex-shrink-0 px-4 py-3 bg-white"
          style={{ borderTop: '1px solid #DADDE1' }}
        >
          <div className="flex items-start gap-2">
            <Avatar name="Khairunnisa" size="sm" />
            
            {/* Kontainer Utama Input */}
            <div
              className="flex flex-1 flex-col rounded-[18px] px-3 py-2"
              style={{ backgroundColor: '#F0F2F5', opacity: isAtLimit ? 0.6 : 1 }}
            >
              <input
                ref={inputRef}
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment()}
                placeholder={isAtLimit ? `Batas ${MAX_COMMENTS} komentar tercapai` : "Komentar sebagai Khairunnisa..."}
                disabled={isAtLimit}
                className="w-full bg-transparent outline-none disabled:cursor-not-allowed text-[14px]"
                style={{ color: '#050505' }}
              />
              
              {/* Deretan Ikon Ekspresi di Sudut Bawah */}
              <div className="flex items-center justify-between mt-2 pt-1 select-none">
                <div className="flex items-center gap-2 text-[#65676B] text-[15px]">
                  <span className={`cursor-pointer hover:opacity-80 ${isAtLimit ? 'pointer-events-none opacity-40' : ''}`}>😊</span>
                  <span className={`cursor-pointer hover:opacity-80 ${isAtLimit ? 'pointer-events-none opacity-40' : ''}`}>📷</span>
                  <span className={`cursor-pointer hover:opacity-80 ${isAtLimit ? 'pointer-events-none opacity-40' : ''}`}>🏷️</span>
                  <span className={`text-[10px] font-bold bg-[#CED0D4] px-1 rounded-[4px] text-white ${isAtLimit ? 'opacity-40' : 'cursor-pointer hover:opacity-80'}`}>GIF</span>
                </div>
                
                {/* Tombol Kirim */}
                <button
                  onClick={handleSubmitComment}
                  disabled={!commentInput.trim() || isSubmitting || isAtLimit}
                  className="transition-opacity disabled:opacity-30 focus:outline-none px-1"
                  style={{ color: '#1877F2' }}
                  aria-label="Kirim"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 rotate-45">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}