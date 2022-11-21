import { useEffect, useMemo, useState } from 'react'
import { MarketTickerInterface } from '../dashboard'

interface MarketTickerStateInterface {
  close: string
  eventTime: string
  high: string
  low: string
  open: string
  quoteVolume: string
  volume: string
}

interface RowProps {
  tickers: MarketTickerInterface
  symbol: string
}

export function TickersRow ({ tickers, symbol }: RowProps) {
  const [ticker, setTicker] = useState<MarketTickerStateInterface>({
    open: '0',
    close: '0',
    high: '0',
    low: '0',
    eventTime: '0',
    quoteVolume: '0',
    volume: '0'
  })

  useEffect(() => {
    if (tickers[symbol]) {
      setTicker(tickers[symbol])
    }
  }, [tickers[symbol]])

  const tickersRow = useMemo(() => {
    return (
      <tr className='bg-slate-800 hover:opacity-70'>
        <td className='py-3 px-2 text-center rounded-tl-md rounded-bl-md'>{symbol}</td>
        <td className='py-3 px-2 text-center'>{ticker.open.substring(0, 8)}</td>
        <td className='py-3 px-2 text-center'>{ticker.close.substring(0, 8)}</td>
        <td className='py-3 px-2 text-center'>{ticker.high.substring(0, 8)}</td>
        <td className='py-3 px-2 text-center rounded-tr-md rounded-br-md'>{ticker.low.substring(0, 8)}</td>
      </tr>
    )
  }, [ticker])

  return (
    tickersRow
  )
}
