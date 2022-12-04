import { AxiosResponse } from 'axios'
import { SideOrderType, TypeOrderType } from '../shared/types'
import { api } from './base.api'

export interface OrderInterface {
  id: string
  automationId?: string
  symbol: string
  orderId: string
  clientOrderId: string
  transactionTime: string
  type: string
  side: string
  quantity: string
  status: string
  icebergQuantity?: string
  obs?: string
  limitPrice?: string
  stopPrice?: string
  avgPrice?: string
  comission?: string
  net?: string
  isMaker: boolean
  userId: string
  updatedAt: Date
  createdAt: Date
}

export interface NewOrderInterface {
  symbol: string
  quantity: string
  limitPrice?: string
  side: SideOrderType
  type: TypeOrderType
  automationId?: string
  isMaker: boolean
  options: {
    stopPrice?: string
    icebergQuantity?: string
    type?: string
  }
}

interface GetOrdersRequestInterface {
  page?: number
  symbol?: string
}

export interface GetOrdersResponseInterface {
  pages: number
  orders: OrderInterface[]
}

interface CancelOrderInterface {
  symbol: string
  orderId: string
}

export async function getOrders ({ symbol, page }: GetOrdersRequestInterface): Promise<AxiosResponse> {
  const response = await api.get(`/orders/get${symbol ?? ''}?page=${page ?? 1}`)

  return response
}

export async function newOrder (data: NewOrderInterface): Promise<AxiosResponse> {
  const response = await api.post('/orders/new', data)

  return response
}

export async function cancelOrder ({ symbol, orderId }: CancelOrderInterface): Promise<AxiosResponse> {
  const response = await api.patch('/orders/cancel', { symbol, orderId })

  return response
}
