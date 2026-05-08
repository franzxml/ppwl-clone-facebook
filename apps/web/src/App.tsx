import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Bell, Home, Image, Search, Send, Users } from 'lucide-react'
import { appMetadata, type ApiHealth } from '@ppwl/shared'
import { Button } from '@/components/ui/button'

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const feedItems = [
  {
    author: 'Rafi Pratama',
    content: 'Menyiapkan halaman feed awal untuk tugas besar cloning Facebook.',
    time: 'Baru saja',
  },
  {
    author: 'Nadia Putri',
    content: 'Monorepo sudah siap dipakai untuk pengembangan frontend dan backend.',
    time: '12 menit lalu',
  },
]

function App() {
  const [health, setHealth] = useState<ApiHealth | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${apiBaseUrl}/health`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('API tidak tersedia.')
        }

        return response.json() as Promise<ApiHealth>
      })
      .then(setHealth)
      .catch(() => setHealth(null))
      .finally(() => setIsLoading(false))

    return () => controller.abort()
  }, [])

  const apiStatus = isLoading ? 'Mengecek API' : health ? 'API aktif' : 'API offline'

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4">
          <a href="/" className="text-xl font-bold text-blue-600">
            {appMetadata.name}
          </a>
          <label className="hidden flex-1 items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-500 sm:flex">
            <Search className="size-4" aria-hidden="true" />
            <span>Cari teman atau postingan</span>
          </label>
          <nav className="ml-auto flex items-center gap-2">
            <IconButton label="Beranda">
              <Home className="size-5" aria-hidden="true" />
            </IconButton>
            <IconButton label="Teman">
              <Users className="size-5" aria-hidden="true" />
            </IconButton>
            <IconButton label="Notifikasi">
              <Bell className="size-5" aria-hidden="true" />
            </IconButton>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr_260px]">
        <aside className="hidden space-y-2 lg:block">
          <SidebarButton icon={<Home className="size-5" aria-hidden="true" />} label="Beranda" />
          <SidebarButton icon={<Users className="size-5" aria-hidden="true" />} label="Teman" />
          <SidebarButton icon={<Bell className="size-5" aria-hidden="true" />} label="Notifikasi" />
        </aside>

        <section className="space-y-4">
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

          {feedItems.map((item) => (
            <article
              key={`${item.author}-${item.time}`}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-950">{item.author}</h2>
                  <p className="text-sm text-slate-500">{item.time}</p>
                </div>
              </div>
              <p className="mt-4 leading-7 text-slate-700">{item.content}</p>
            </article>
          ))}
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Status backend</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{apiStatus}</p>
            {health ? (
              <p className="mt-2 text-sm text-slate-500">Versi {health.version}</p>
            ) : null}
          </div>
        </aside>
      </div>
    </main>
  )
}

type IconButtonProps = {
  label: string
  children: ReactNode
}

function IconButton({ label, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex size-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600"
    >
      {children}
    </button>
  )
}

type SidebarButtonProps = {
  icon: ReactNode
  label: string
}

function SidebarButton({ icon, label }: SidebarButtonProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-blue-600"
    >
      {icon}
      {label}
    </button>
  )
}

export default App
