import { useAuthentication } from './auth/useAuthentication'

export const useFetchWithAuth = () => {
  const { accessToken } = useAuthentication()

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
