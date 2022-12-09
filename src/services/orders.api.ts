import { AxiosResponse } from 'axios'
import { OrderInterface, SideOrderType, TypeOrderType } from '../shared/types'
import { api } from './base.api'

export interface NewOrderRequestInterface {
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
  orderId: number
}

export async function getOrders ({ symbol, page }: GetOrdersRequestInterface): Promise<AxiosResponse> {
  const response = await api.get(`/orders/${symbol ?? ''}?page=${page ?? 1}`)

  return response
}

export async function newOrder (data: NewOrderRequestInterface): Promise<AxiosResponse> {
  const response = await api.post('/orders/new', data)

  return response
}

export async function cancelOrder ({ symbol, orderId }: CancelOrderInterface): Promise<AxiosResponse> {
  const response = await api.patch('/orders/cancel', { symbol, orderId })

  return response
}
