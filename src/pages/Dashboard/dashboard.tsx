import { useContext, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { Box } from '../../components/Box'
import { SelectQuote } from '../../components/SelectQuote'
import { AuthContext } from '../../context/authContext'
import { usePersistedState } from '../../hooks/usePersistState'
import { getSymbols } from '../../services/api.servives'
import { BooksTable } from './bookTicker/booksTable'
import { CandleChart } from './candleChart/candleChart'
import { TickersTable } from './marketTicker/tickersTable'
import { WalletTable } from './wallet/walletTable'

export interface SymbolsInterface {
  id: string
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

interface LastJsonMessageInterface {
  market: MarketTickerInterface
  book: Array<{
    updateId: number
    symbol: string
    bestBid: string
    bestBidQty: string
    bestAsk: string
    bestAskQty: string
  }>
  balance: BalanceInterface
}

export function DashboardPage () {
  const { token } = useContext(AuthContext)
  const [books, setBooks] = useState<BookOrderInterface>({})
  const [balance, setBalance] = useState<BalanceInterface>({})
  const [tickers, setTickers] = useState<MarketTickerInterface>({})
  const [symbols, setSymbols] = useState<SymbolsInterface[]>([])
  const [defaultQuote, setDefaultQuote] = usePersistedState<string>('BOTCRYPTO_QUOTE_DASHBOARD', 'FAVORITES')

  const { lastJsonMessage } = useWebSocket(import.meta.env.VITE_APP_WS_URL, {
    onOpen: () => console.log('Connected'),
    onMessage: () => {
      if (lastJsonMessage) {
        const { market, book, balance } = lastJsonMessage as unknown as LastJsonMessageInterface

        if (balance) setBalance(balance)

        if (market) setTickers(market)

        if (book) {
          console.log(book)
          book.forEach(item => { books[item.symbol] = item })
          setBooks(books)
        }
      }
    },
    onError: (err) => console.error(err),
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    protocols: token ?? ''
  })

  function handleSelect (event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    setDefaultQuote(value)
  }

  async function handleGetSymbols (): Promise<void> {
    const response = await getSymbols()

    const symbols = response.data.filter((symbol: SymbolsInterface) => {
      if (defaultQuote === 'FAVORITES') {
        return symbol.isFavorite
      } else {
        return symbol.symbol.endsWith(defaultQuote)
      }
    })

    setSymbols(symbols)
  }

  useEffect(() => {
    handleGetSymbols().catch(err => console.log(err))
  }, [defaultQuote])

  return (
    <main className='px-8 pb-4 w-screen h-full flex flex-col gap-6 overflow-auto'>
      <Box mt='sm' size='sm'>
        <div className='w-full h-full flex items-center justify-between'>
          <h1 className='text-xl'>Dashboard</h1>

        </div>
      </Box>

      <Box size='md'>
        <CandleChart />
      </Box>

      <Box size='md'>
        <div className='w-full flex items-center'>
          <div className='w-full h-full flex items-center justify-between'>
            <h1 className='text-xl block w-full'>Market 24h</h1>
            <div className='w-full h-full flex items-center justify-end'>
              <SelectQuote defaultQuote={defaultQuote} onChange={(e) => handleSelect(e)} />
            </div>
          </div>
        </div>

        <div className='w-full max-h-96 overflow-auto'>
          <TickersTable symbols={symbols} tickers={tickers} />
        </div>
      </Box>

      <Box size='md'>
        <div className='w-full flex gap-4'>
          <div className='w-full flex flex-col'>
            <div className='w-full flex items-center'>
              <h1 className='text-xl'>Books</h1>
            </div>
            <div className='w-full max-h-96 overflow-auto'>
              <BooksTable symbols={symbols} books={books} />
            </div>
          </div>

          <div className='w-full flex flex-col'>
            <div className='w-full flex items-center'>
              <h1 className='text-xl'>Wallet</h1>
            </div>
            <div className='w-full max-h-96 overflow-auto'>
              <WalletTable balanceStream={balance} />

            </div>
          </div>
        </div>
      </Box>
    </main>
  )
}
