import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
type err = AxiosError | Error

export function useOnError (error: err): void {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.reload()
    } else {
      toast.error(error.response?.data.message ?? error.message)
    }
  } else {
    toast.error(error.message)
  }
}
