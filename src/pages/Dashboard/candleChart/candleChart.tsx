/* eslint-disable new-cap */
import { useEffect, useMemo, useState } from 'react'

declare global {
  interface Window {
    TradingView: any
  }
}

export function CandleChart () {
  const [widgetChart, setWidgetChart] = useState({
    autosize: true,
    symbol: 'BINANCE:BTCBUSD',
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

  useEffect(() => {
    const widget = new window.TradingView.widget(widgetChart)

    setWidgetChart(widget)
  }, [])

  const Chart = useMemo(() => {
    return (
      <div className="tradingview-widget-container">
        <div id="tradingview_08959" className='aspect-video'></div>
      </div>
    )
  }, [])

  return (
    Chart
  )
}
