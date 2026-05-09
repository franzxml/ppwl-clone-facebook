import { CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/layouts/AppLayout'
import type { AppNotification } from '@/types/social'

type NotificationsPageProps = {
  notifications: AppNotification[]
}

export function NotificationsPage({ notifications }: NotificationsPageProps) {
  return (
    <AppLayout>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-slate-950">Notifikasi</h1>
          <Button variant="secondary" className="gap-2">
            <CheckCheck className="size-4" aria-hidden="true" />
            Tandai Dibaca
          </Button>
        </div>
        <div className="mt-4 divide-y divide-slate-100">
          {notifications.map((notification) => (
            <article key={notification.id} className="py-3">
              <p className="text-sm font-medium text-slate-900">
                {notification.actor?.name ?? 'Sistem'} {notification.type === 'post_like' ? 'menyukai' : 'mengomentari'} postingan Anda
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {new Date(notification.createdAt).toLocaleString('id-ID')}
              </p>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}
