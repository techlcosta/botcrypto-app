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

export interface MarketTickerInterface {
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

export interface OrderInterface {
  symbol: string
  limitPrice: string
  stopPrice: string
  quantity: string
  icebergQty: string
  side: SideOrderType
  type: TypeOrderType
}

export const STOP_TYPES: StopTypes[] = ['STOP_LOSS', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT', 'TAKE_PROFIT_LIMIT']

type OrderStatusType = 'NEW' | 'FILLED' | 'CANCELED'

export interface ExecutionReportInterface {
  e: string // Event type
  E: bigint // Event time
  s: string // Symbol
  c: string // Client order ID
  S: string // Side
  o: string // Order type
  f: string // Time in force
  q: string // Order quantity
  p: string // Order price
  P: string // Stop price
  d: number // Trailing Delta; This is only visible if the order was a trailing stop order.
  F: string // Iceberg quantity
  g: number // OrderListId
  C: string // Original client order ID; This is the ID of the order being canceled
  x: string // Current execution type
  X: OrderStatusType // Current order status
  r: string // Order reject reason; will be an error code.
  i: number // Order ID
  l: string // Last executed quantity
  z: string // Cumulative filled quantity
  L: string // Last executed price
  n: string // Commission amount
  N: null // Commission asset
  T: bigint // Transaction time
  t: number // Trade ID
  I: number // Ignore
  w: true // Is the order on the book?
  m: false // Is this trade the maker side?
  M: false // Ignore
  O: bigint // Order creation time
  Z: string // Cumulative quote asset transacted quantity
  Y: string // Last quote asset transacted quantity (i.e. lastPrice * lastQty)
  Q: string // Quote Order Qty
  j: number// Strategy ID; This is only visible if the strategyId parameter was provided upon order placement
  J: number // Strategy Type; This is only visible if the strategyType parameter was provided upon order placement
}
