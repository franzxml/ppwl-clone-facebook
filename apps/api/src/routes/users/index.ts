import { Elysia } from 'elysia'
import { prisma } from '../../db/prisma'
import { getCurrentUser } from '../../http/auth'
import { errorPayload } from '../../http/errors'

const publicAuthorSelect = {
  id: true,
  name: true,
  email: true,
  avatarUrl: true,
} as const

export const userRoutes = new Elysia({ prefix: '/users' })
  .get('/:userId', async ({ params, request, set }) => {
    const currentUser = await getCurrentUser(request.headers)

    if (!currentUser) {
      set.status = 401
      return errorPayload('Sesi tidak valid.')
    }

    const user = await prisma.user.findUnique({
      where: { id: params.userId },
      select: {
        ...publicAuthorSelect,
        createdAt: true,
        posts: {
          include: {
            author: { select: publicAuthorSelect },
            images: true,
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            posts: true,
            comments: true,
            likes: true,
          },
        },
      },
    })

    if (!user) {
      set.status = 404
      return errorPayload('Pengguna tidak ditemukan.')
    }

    return { user }
  })
