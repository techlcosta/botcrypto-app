/* eslint-disable new-cap */
import { useEffect, useMemo, useState } from 'react'

declare global {
  interface Window {
    TradingView: any
  }
}

interface CandleChartProps {
  symbol: string
}

export function CandleChart ({ symbol }: CandleChartProps) {
  const [, setWidgetChart] = useState({})

  useEffect(() => {
    const widget = new window.TradingView.widget({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: '60',
      timezone: 'Asia/Tokyo',
      theme: 'dark',
      style: '1',
      locale: 'br',
      toolbar_bg: '#f1f3f6',
      enable_publishing: true,
      hide_side_toolbar: false,
      details: true,
      container_id: 'tradingview_08959'
    })

    setWidgetChart(widget)
  }, [symbol])

  const Chart = useMemo(() => {
    return (
      <div className="tradingview-widget-container">
        <div id="tradingview_08959" className='aspect-video'></div>
      </div>
    )
  }, [symbol])

  return (
    Chart
  )
}
