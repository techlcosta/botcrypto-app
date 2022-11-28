import { useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { JsonValue } from 'react-use-websocket/dist/lib/types'

interface BookTikerInterface {
  u?: number
  s?: string
  b: string
  B?: string
  a: string
  A?: string
}

export interface BookInterface {
  ask: string
  bid: string
}

interface SymbolPriceProps {
  symbol: string
  onChange: (book: BookInterface) => void
}
export function SymbolPrice ({ symbol, onChange }: SymbolPriceProps) {
  const [book, setBook] = useState<BookInterface>({ ask: '0', bid: '0' })

  const URL = `${(import.meta.env.VITE_BWS_URL as string).endsWith('/')
    ? (`${import.meta.env.VITE_BWS_URL as string}${symbol}`).toLocaleLowerCase()
    : (`${import.meta.env.VITE_BWS_URL as string}/${symbol}`).toLocaleLowerCase()}@bookTicker`

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(URL, {
    onOpen: () => {
      console.log('Connected')
      sendJsonMessage({
        method: 'SUBSCRIBE',
        params: [`${symbol.toLocaleLowerCase()}@bookTicker`] as unknown as JsonValue,
        id: 1
      })
    },
    onMessage: () => {
      if (lastJsonMessage) {
        const { a, b } = lastJsonMessage as unknown as BookTikerInterface
        if (a || b) {
          setBook({ ask: a, bid: b })
          onChange({ ask: a, bid: b })
        }
      }
    },
    onError: (err) => console.error(err),
    shouldReconnect: () => true,
    reconnectInterval: 3000
  })

  return (
    <label className='w-full flex flex-col justify-center items-center gap-1'>
      <div className='w-full text-left'>Market Price</div>
      <div className='w-full h-12 flex flex-col justify-center items-center gap-1 bg-slate-800 border-solid border-2 border-gray-700 rounded-md text-sm text-center '>
        <div className='w-full  bg-green-300 text-green-800 rounded-tl-md rounded-tr-md'>ASK: {book.ask ? book.ask.substring(0, 8) : ''}</div>
        <div className='w-full  bg-red-300 text-red-800 rounded-bl-md rounded-br-md'>BID: {book.bid ? book.bid.substring(0, 8) : ''}</div>
      </div>
    </label>
  )
}
