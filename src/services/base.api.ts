import axios from 'axios'

const TOKEN = localStorage.getItem('BOTCRYPTO_TOKEN')?.replace(/["\s]/g, '')

export const api = axios.create({

  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    common: {
      Authorization: `Bearer ${TOKEN as string}`
    }
  }
})

export const setDefaultsHeaders = (token: string) => {
  api.defaults.headers.common = {
    Authorization: `Bearer ${String(token)}`
  }
}
