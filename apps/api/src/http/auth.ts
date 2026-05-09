import { prisma } from '../db/prisma'

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7

type PublicUserSource = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  createdAt?: Date
  updatedAt?: Date
}

type SessionSource = {
  token: string
  expiresAt: Date
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase()

export const toPublicUser = (user: PublicUserSource) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatarUrl: user.avatarUrl,
  createdAt: user.createdAt?.toISOString(),
  updatedAt: user.updatedAt?.toISOString(),
})

export const toSessionPayload = (session: SessionSource) => ({
  token: session.token,
  expiresAt: session.expiresAt.toISOString(),
})

export const createSession = (userId: string) =>
  prisma.session.create({
    data: {
      userId,
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
    },
  })

export const getSessionToken = (headers: Headers) => {
  const authorization = headers.get('authorization')

  if (authorization?.startsWith('Bearer ')) {
    return authorization.slice('Bearer '.length).trim()
  }

  return headers.get('x-session-token')?.trim() || null
}

export const getCurrentUser = async (headers: Headers) => {
  const token = getSessionToken(headers)

  if (!token) {
    return null
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session) {
    return null
  }

  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({ where: { id: session.id } })
    return null
  }

  return session.user
}
