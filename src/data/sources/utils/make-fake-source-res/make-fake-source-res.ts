import type { HttpServiceResponse } from '@/shared'

const FAKE_RESPONSE_DELAY = 500

export function makeFakeSourceRes<TResponse>(data: TResponse): Promise<HttpServiceResponse<TResponse>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: {},
        status: 200,
        statusText: 'success',
        data,
        // HTTP client config type is complex and not relevant for fake responses
        config: {} as any,
      })
    }, FAKE_RESPONSE_DELAY)
  })
}
