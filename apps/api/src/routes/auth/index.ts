import { Elysia, t } from 'elysia'
import { prisma } from '../../db/prisma'
import {
  createSession,
  getCurrentUser,
  getSessionToken,
  normalizeEmail,
  toPublicUser,
  toSessionPayload,
} from '../../http/auth'
import { errorPayload } from '../../http/errors'

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post(
    '/register',
    async ({ body, set }) => {
      const email = normalizeEmail(body.email)
      const existingUser = await prisma.user.findUnique({ where: { email } })

      if (existingUser) {
        set.status = 409
        return errorPayload('Email sudah digunakan.')
      }

      const user = await prisma.user.create({
        data: {
          name: body.name.trim(),
          email,
          passwordHash: await Bun.password.hash(body.password),
          avatarUrl: body.avatarUrl,
        },
      })
      const session = await createSession(user.id)

      set.status = 201
      return {
        user: toPublicUser(user),
        session: toSessionPayload(session),
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ minLength: 3 }),
        password: t.String({ minLength: 6 }),
        avatarUrl: t.Optional(t.String()),
      }),
    },
  )
  .post(
    '/login',
    async ({ body, set }) => {
      const email = normalizeEmail(body.email)
      const user = await prisma.user.findUnique({ where: { email } })

      if (!user?.passwordHash) {
        set.status = 401
        return errorPayload('Email atau kata sandi tidak valid.')
      }

      const isValidPassword = await Bun.password.verify(body.password, user.passwordHash)

      if (!isValidPassword) {
        set.status = 401
        return errorPayload('Email atau kata sandi tidak valid.')
      }

      const session = await createSession(user.id)

      return {
        user: toPublicUser(user),
        session: toSessionPayload(session),
      }
    },
    {
      body: t.Object({
        email: t.String({ minLength: 3 }),
        password: t.String({ minLength: 1 }),
      }),
    },
  )
  .post(
    '/oauth/google',
    async ({ body, set }) => {
      const email = normalizeEmail(body.email)
      const user = await prisma.user.upsert({
        where: { email },
        update: {
          name: body.name.trim(),
          avatarUrl: body.avatarUrl,
        },
        create: {
          name: body.name.trim(),
          email,
          avatarUrl: body.avatarUrl,
        },
      })

      await prisma.account.upsert({
        where: {
          provider_providerAccountId: {
            provider: 'google',
            providerAccountId: body.providerAccountId,
          },
        },
        update: {
          userId: user.id,
        },
        create: {
          userId: user.id,
          provider: 'google',
          providerAccountId: body.providerAccountId,
        },
      })

      const session = await createSession(user.id)

      set.status = 201
      return {
        user: toPublicUser(user),
        session: toSessionPayload(session),
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ minLength: 3 }),
        avatarUrl: t.Optional(t.String()),
        providerAccountId: t.String({ minLength: 1 }),
      }),
    },
  )
  .post('/logout', async ({ request }) => {
    const token = getSessionToken(request.headers)

    if (token) {
      await prisma.session.deleteMany({ where: { token } })
    }

    return { success: true }
  })
  .get('/me', async ({ request, set }) => {
    const user = await getCurrentUser(request.headers)

    if (!user) {
      set.status = 401
      return errorPayload('Sesi tidak valid.')
    }

    return { user: toPublicUser(user) }
  })
