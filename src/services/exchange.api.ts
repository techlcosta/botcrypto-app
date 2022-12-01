import { AxiosResponse } from 'axios'
import { api } from './base.api'

export async function getBalance (): Promise<AxiosResponse> {
  const response = await api.get('/exchange/balance')

  return response
}
