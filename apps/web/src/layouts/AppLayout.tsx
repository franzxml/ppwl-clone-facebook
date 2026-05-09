import type { ReactNode } from 'react'
import { Bell, Home, Search, User, Users } from 'lucide-react'
import { appMetadata } from '@ppwl/shared'

type AppLayoutProps = {
  children: ReactNode
  aside?: ReactNode
  sidebar?: ReactNode
}

export function AppLayout({ children, aside, sidebar }: AppLayoutProps) {
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
            <NavIcon href="/" label="Beranda" icon={<Home className="size-5" aria-hidden="true" />} />
            <NavIcon
              href="/profile"
              label="Profil"
              icon={<User className="size-5" aria-hidden="true" />}
            />
            <NavIcon
              href="/notifications"
              label="Notifikasi"
              icon={<Bell className="size-5" aria-hidden="true" />}
            />
          </nav>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr_260px]">
        <aside className="hidden space-y-2 lg:block">
          {sidebar ?? (
            <>
              <SidebarLink href="/" icon={<Home className="size-5" aria-hidden="true" />} label="Beranda" />
              <SidebarLink
                href="/users"
                icon={<Users className="size-5" aria-hidden="true" />}
                label="Teman"
              />
              <SidebarLink
                href="/notifications"
                icon={<Bell className="size-5" aria-hidden="true" />}
                label="Notifikasi"
              />
            </>
          )}
        </aside>
        <section className="space-y-4">{children}</section>
        <aside className="space-y-4">{aside}</aside>
      </div>
    </main>
  )
}

type NavIconProps = {
  href: string
  label: string
  icon: ReactNode
}

function NavIcon({ href, label, icon }: NavIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className="flex size-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600"
    >
      {icon}
    </a>
  )
}

type SidebarLinkProps = {
  href: string
  icon: ReactNode
  label: string
}

function SidebarLink({ href, icon, label }: SidebarLinkProps) {
  return (
    <a
      href={href}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-blue-600"
    >
      {icon}
      {label}
    </a>
  )
}
