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

export interface OrderInterface {
  symbol: string
  price: string
  stopPrice: string
  quantity: string
  icebergQty: string
  side: SideOrderType
  type: TypeOrderType
}
