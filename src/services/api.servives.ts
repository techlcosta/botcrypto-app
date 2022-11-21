import axios, { AxiosResponse } from 'axios'

interface UpdateInfosInterface {
  id: string
  username: string
  password?: string
  confirmPas?: string
  apiURL?: string
  accessKey?: string
  secretKey?: string
}

interface UpdateSymbolsInterface {
  symbol: string
  basePrecision?: number
  quotePrecision?: number
  minNotional?: string
  minLotSize?: string
  isFavorite?: boolean
}

const TOKEN = localStorage.getItem('BOTCRYPTO_TOKEN')?.replace(/["\s]/g, '')

const api = axios.create({

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

export async function authenticate (username: string, password: string): Promise<AxiosResponse> {
  const response = await api.post('/user/authenticate', { username, password })

  setDefaultsHeaders(response.data.token)

  return response
}

export async function getInfos (): Promise<AxiosResponse> {
  const response = await api.get('/user/infos')

  return response
}

export async function updateInfos (data: UpdateInfosInterface): Promise<AxiosResponse> {
  const response = await api.patch('/user/update', data)

  return response
}

export async function getSymbols (): Promise<AxiosResponse> {
  const response = await api.get('/symbols')

  return response
}

export async function updateSymbols (data: UpdateSymbolsInterface): Promise<AxiosResponse> {
  const response = await api.patch('/symbols/update', data)

  return response
}

export async function syncSymbols (): Promise<AxiosResponse> {
  const response = await api.post('/symbols/sync')

  return response
}

export async function getBalance (): Promise<AxiosResponse> {
  const response = await api.get('/exchange/balance')

  return response
}
