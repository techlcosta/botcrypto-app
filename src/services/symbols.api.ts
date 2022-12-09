import { AxiosResponse } from 'axios'
import { SymbolsInterface } from '../shared/types'
import { api } from './base.api'

interface UpdateSymbolsInterface {
  symbol: string
  basePrecision?: number
  quotePrecision?: number
  minNotional?: string
  minLotSize?: string
  isFavorite?: boolean
}

interface RequestGetSymbolsInterface {
  page?: number
  symbol?: string
  onlyFavorites?: boolean
}

interface ResponseGetSymbolsInterface {
  symbols: SymbolsInterface[]
  pages: number
}

export async function getSymbols (data?: RequestGetSymbolsInterface): Promise<ResponseGetSymbolsInterface> {
  const response = await api.get(`/symbols/${data?.symbol ?? ''}`, { params: data })

  const symbols = response.data.symbols
  const pages = response.data.pages

  return { symbols, pages }
}

export async function updateSymbols (data: UpdateSymbolsInterface): Promise<AxiosResponse> {
  const response = await api.patch('/symbols/update', data)

  return response
}

export async function syncSymbols (): Promise<AxiosResponse> {
  const response = await api.post('/symbols/sync')

  return response
}
