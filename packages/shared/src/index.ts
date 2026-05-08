export type ApiHealth = {
  status: 'ok'
  appName: string
  version: string
  timestamp: string
}

export const appMetadata = {
  name: 'PPWL Clone Facebook',
  version: '0.1.0',
} as const

export const createHealthPayload = (date = new Date()): ApiHealth => ({
  status: 'ok',
  appName: appMetadata.name,
  version: appMetadata.version,
  timestamp: date.toISOString(),
})
