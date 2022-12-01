import { AxiosResponse } from 'axios'
import { api } from './base.api'

interface UpdateSymbolsInterface {
  symbol: string
  basePrecision?: number
  quotePrecision?: number
  minNotional?: string
  minLotSize?: string
  isFavorite?: boolean
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
