import { AxiosResponse } from 'axios'
import { api, setDefaultsHeaders } from './base.api'

interface UpdateInfosInterface {
  id: string
  username: string
  password?: string
  confirmPas?: string
  apiURL?: string
  accessKey?: string
  secretKey?: string
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
