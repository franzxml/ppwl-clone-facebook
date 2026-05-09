const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  token?: string
  body?: unknown
}

export async function apiRequest<TResponse>(path: string, options: RequestOptions = {}) {
  const headers = new Headers()

  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`)
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  })

  if (!response.ok) {
    throw new Error('Request API gagal.')
  }

  return response.json() as Promise<TResponse>
}

export { apiBaseUrl }
