import { useAccessToken } from './auth/useAccessToken'

export const useFetchWithAuth = () => {
  const accessToken = useAccessToken()

  return async <T>(input: RequestInfo | URL, options?: RequestInit) => {
    const response = await fetch(input, {
      ...options,
      headers: { ...options?.headers, Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return (await response.json()) as T
  }
}
