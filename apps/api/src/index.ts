import { cors } from '@elysiajs/cors'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { Elysia } from 'elysia'
import { appMetadata, createHealthPayload, type ApiHealth } from '@ppwl/shared'
import { PrismaClient } from './generated/prisma/client'

const databaseUrl = process.env.DATABASE_URL ?? 'file:./prisma/dev.db'
const adapter = new PrismaLibSql({ url: databaseUrl })
const prisma = new PrismaClient({ adapter })

const port = Number(process.env.PORT ?? 3000)
const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173'

const app = new Elysia()
  .use(cors({ origin: corsOrigin }))
  .get('/', () => ({
    message: `${appMetadata.name} API`,
    docs: '/health',
  }))
  .get('/health', async (): Promise<ApiHealth> => {
    await prisma.$queryRaw`SELECT 1`

    return createHealthPayload()
  })
  .get('/posts', () =>
    prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  )
  .listen(port)

console.info(
  `API ${appMetadata.name} berjalan di http://${app.server?.hostname ?? 'localhost'}:${app.server?.port}`,
)
