import { Camera, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/layouts/AppLayout'
import type { PublicUser } from '@/types/social'

type ProfilePageProps = {
  user: PublicUser
}

export function ProfilePage({ user }: ProfilePageProps) {
  return (
    <AppLayout>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-700">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-950">{user.name}</h1>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
        <form className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Avatar URL
            <div className="mt-2 flex gap-2">
              <input
                type="url"
                defaultValue={user.avatarUrl ?? ''}
                className="h-10 flex-1 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
              />
              <Button variant="secondary" type="button" aria-label="Upload avatar">
                <Camera className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Nama
            <input
              type="text"
              defaultValue={user.name}
              className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              defaultValue={user.email}
              className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
            />
          </label>
          <Button className="gap-2" type="submit">
            <Save className="size-4" aria-hidden="true" />
            Simpan
          </Button>
        </form>
      </section>
    </AppLayout>
  )
}
