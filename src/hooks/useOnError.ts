import { AxiosError } from 'axios'
type err = AxiosError | Error

export function useOnError (error: err): string | undefined {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.reload()
    } else {
      return error.response?.data.message ?? error.message
    }
  } else {
    return error.message
  }
}
