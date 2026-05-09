import { Elysia, t } from 'elysia'
import { prisma } from '../../db/prisma'
import { getCurrentUser, normalizeEmail, toPublicUser } from '../../http/auth'
import { errorPayload } from '../../http/errors'

export const profileRoutes = new Elysia({ prefix: '/profile' })
  .get('/', async ({ request, set }) => {
    const user = await getCurrentUser(request.headers)

    if (!user) {
      set.status = 401
      return errorPayload('Sesi tidak valid.')
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: true,
            comments: true,
            likes: true,
          },
        },
      },
    })

    return { profile }
  })
  .patch(
    '/',
    async ({ body, request, set }) => {
      const user = await getCurrentUser(request.headers)

      if (!user) {
        set.status = 401
        return errorPayload('Sesi tidak valid.')
      }

      const email = body.email ? normalizeEmail(body.email) : undefined

      if (email && email !== user.email) {
        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser) {
          set.status = 409
          return errorPayload('Email sudah digunakan.')
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(body.name ? { name: body.name.trim() } : {}),
          ...(email ? { email } : {}),
          ...(body.avatarUrl !== undefined ? { avatarUrl: body.avatarUrl } : {}),
          ...(body.password ? { passwordHash: await Bun.password.hash(body.password) } : {}),
        },
      })

      return { user: toPublicUser(updatedUser) }
    },
    {
      body: t.Object({
        name: t.Optional(t.String({ minLength: 1 })),
        email: t.Optional(t.String({ minLength: 3 })),
        avatarUrl: t.Optional(t.String()),
        password: t.Optional(t.String({ minLength: 6 })),
      }),
    },
  )
