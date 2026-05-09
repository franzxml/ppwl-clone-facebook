import { Elysia, t } from 'elysia'
import { prisma } from '../../db/prisma'
import { getCurrentUser } from '../../http/auth'
import { errorPayload } from '../../http/errors'

const publicAuthorSelect = {
  id: true,
  name: true,
  email: true,
  avatarUrl: true,
} as const

export const commentRoutes = new Elysia({ prefix: '/comments' })
  .patch(
    '/:commentId',
    async ({ body, params, request, set }) => {
      const user = await getCurrentUser(request.headers)

      if (!user) {
        set.status = 401
        return errorPayload('Sesi tidak valid.')
      }

      const comment = await prisma.comment.findUnique({
        where: { id: params.commentId },
        select: { userId: true },
      })

      if (!comment) {
        set.status = 404
        return errorPayload('Komentar tidak ditemukan.')
      }

      if (comment.userId !== user.id) {
        set.status = 403
        return errorPayload('Anda hanya dapat mengubah komentar milik sendiri.')
      }

      const updatedComment = await prisma.comment.update({
        where: { id: params.commentId },
        data: { content: body.content.trim() },
        include: {
          author: { select: publicAuthorSelect },
        },
      })

      return { comment: updatedComment }
    },
    {
      body: t.Object({
        content: t.String({ minLength: 1 }),
      }),
    },
  )
  .delete('/:commentId', async ({ params, request, set }) => {
    const user = await getCurrentUser(request.headers)

    if (!user) {
      set.status = 401
      return errorPayload('Sesi tidak valid.')
    }

    const comment = await prisma.comment.findUnique({
      where: { id: params.commentId },
      select: { userId: true },
    })

    if (!comment) {
      set.status = 404
      return errorPayload('Komentar tidak ditemukan.')
    }

    if (comment.userId !== user.id) {
      set.status = 403
      return errorPayload('Anda hanya dapat menghapus komentar milik sendiri.')
    }

    await prisma.comment.delete({ where: { id: params.commentId } })

    return { success: true }
  })
