export interface SymbolsInterface {
  id: string
  base: string
  quote: string
  symbol: string
  basePrecision: number
  quotePrecision: number
  minNotional: string
  minLotSize: string
  isFavorite: boolean
  updatedAt: Date
  createdAt: Date
}

export interface WsMarketTickerInterface {
  [key: string]: {
    close: string
    eventTime: string
    high: string
    low: string
    open: string
    quoteVolume: string
    volume: string
  }
}

export interface WsBookOrderInterface {
  updateId: number
  symbol: string
  bestBid: string
  bestBidQty: string
  bestAsk: string
  bestAskQty: string
}

export interface BookOrderInterface {
  [key: string]: {
    updateId: number
    symbol: string
    bestBid: string
    bestBidQty: string
    bestAsk: string
    bestAskQty: string
  }
}

export interface WsBalanceInterface {
  e: string
  E: bigint
  u: bigint
  B: Array<{
    a: string
    f: string
    l: string
  }>

}

export interface BalanceInterface {
  [key: string]: {
    available: string
    onOrder: string
  }
}

export interface WalletProps {
  symbol: string
  available: string
  onOrder: string
}

export type SideOrderType = 'BUY' | 'SELL'

export type TypeOrderType = 'ICEBERG' | 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT'

export type StopTypes = 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT'

export const STOP_TYPES: StopTypes[] = ['STOP_LOSS', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT', 'TAKE_PROFIT_LIMIT']

type OrderStatusType = 'NEW' | 'FILLED' | 'CANCELED' | 'REJECTED' | 'PARTIALLY_FILLED'

export interface OrderInterface {
  id: string
  automationId?: string | null
  symbol: string
  orderId: number
  clientOrderId: string
  transactionTime: string
  type: string
  side: string
  quantity: string
  status: OrderStatusType
  icebergQuantity?: string | null
  obs?: string | null
  limitPrice?: string | null
  stopPrice?: string | null
  avgPrice?: string | null
  comission?: string | null
  net?: string | null
  isMaker: boolean
  userId: string
  updatedAt: Date
  createdAt: Date
}
