import { UserRoundPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/layouts/AppLayout'
import type { PublicUser } from '@/types/social'

type UsersPageProps = {
  users: PublicUser[]
}

export function UsersPage({ users }: UsersPageProps) {
  return (
    <AppLayout>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-lg font-semibold text-slate-950">Teman</h1>
        <div className="mt-4 divide-y divide-slate-100">
          {users.map((user) => (
            <article key={user.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-slate-950">{user.name}</h2>
                  <p className="truncate text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
              <Button variant="secondary" className="shrink-0 gap-2">
                <UserRoundPlus className="size-4" aria-hidden="true" />
                Tambah
              </Button>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}
