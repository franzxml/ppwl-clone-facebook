import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 text-slate-950">
      <form className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold">Daftar Akun</h1>
        <div className="mt-5 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Nama
            <input
              type="text"
              className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Kata sandi
            <input
              type="password"
              className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <Button className="mt-5 w-full gap-2" type="submit">
          <UserPlus className="size-4" aria-hidden="true" />
          Daftar
        </Button>
        <a
          href="/auth"
          className="mt-4 block text-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Sudah punya akun
        </a>
      </form>
    </main>
  )
}
