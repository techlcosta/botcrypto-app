import { CreditCard } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { Box } from '../../components/Box'
import { Button } from '../../components/Button'
import { NewOrderModal } from '../../components/NewOrderModal'
import { SelectQuote } from '../../components/SelectQuote'
import { SelectSymbol } from '../../components/SelectSymbol'
import { AuthContext } from '../../context/authContext'
import { useOnError } from '../../hooks/useOnError'
import { usePersistedState } from '../../hooks/usePersistState'
import { getBalance } from '../../services/exchange.api'
import { getSymbols } from '../../services/symbols.api'
import { BalanceInterface, BookOrderInterface, OrderInterface, SymbolsInterface, WalletProps, WsBalanceInterface, WsBookOrderInterface, WsMarketTickerInterface } from '../../shared/types'
import { BooksTable } from './bookTicker/booksTable'
import { CandleChart } from './candleChart/candleChart'
import { TickersTable } from './marketTicker/tickersTable'
import { WalletTable } from './wallet/walletTable'

interface LastJsonMessageInterface {
  miniTickerStream: WsMarketTickerInterface
  bookTickersStream: WsBookOrderInterface[]
  balanceStream: WsBalanceInterface
  executionStream: OrderInterface
}

export function DashboardPage () {
  const [symbols, setSymbols] = useState<SymbolsInterface[]>([])
  const [defaultQuote, setDefaultQuote] = usePersistedState<string>('BOTCRYPTO_QUOTE_DASHBOARD', 'FAVORITES')
  const { token } = useContext(AuthContext)

  const [books, setBooks] = useState<BookOrderInterface>({})
  const [balance, setBalance] = useState<WsBalanceInterface>({} as WsBalanceInterface)
  const [tickers, setTickers] = useState<WsMarketTickerInterface>({})
  const [wallet, setWallet] = useState<WalletProps[]>([])
  const [chartSymbol, setChartSymbol] = useState<string>('BTCBUSD')

  function handleSelect (event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    setDefaultQuote(value)
  }

  function handleOnChange (event: React.ChangeEvent<HTMLSelectElement>) {
    setChartSymbol(event.target.value)
  }

  const { lastJsonMessage } = useWebSocket(import.meta.env.VITE_APP_WS_URL, {
    onOpen: () => console.log('Connected'),
    onMessage: () => {
      if (lastJsonMessage) {
        const { miniTickerStream, bookTickersStream, balanceStream } = lastJsonMessage as unknown as LastJsonMessageInterface

        if (balanceStream) setBalance(balanceStream)

        if (miniTickerStream) setTickers(miniTickerStream)

        if (bookTickersStream) {
          bookTickersStream.forEach(item => { books[item.symbol] = item })
          setBooks(books)
        }
      }
    },
    onError: (err) => console.error(err),
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    protocols: token ?? ''
  })

  useEffect(() => {
    getBalance()
      .then(response => {
        if (response.data) {
          const balanceWallet = Object.entries(response.data as BalanceInterface).map(([key, value]) => {
            return {
              symbol: key,
              available: value.available,
              onOrder: value.onOrder
            }
          })
          setWallet([...balanceWallet])
        }
      }).catch(err => useOnError(err))
  }, [balance])

  useEffect(() => {
    getSymbols().then(response => {
      const symbols = response.symbols.filter((symbol: SymbolsInterface) => {
        if (defaultQuote === 'FAVORITES') {
          return symbol.isFavorite
        } else {
          return symbol.symbol.endsWith(defaultQuote)
        }
      })

      setSymbols(symbols)
    }).catch(err => useOnError(err))
  }, [defaultQuote])

  return (
    <main className='px-8 pb-4 w-screen h-full flex flex-col gap-6 overflow-auto'>
      <Box mt='sm' size='sm'>
        <div className='w-full h-full flex items-center justify-between'>
          <h1 className='text-xl'>Dashboard</h1>
          <div className='flex gap-4'>
            <NewOrderModal wallet={wallet}>
              <Button type='button' width='w-fit'>
                <CreditCard size={20} weight={'fill'} />
                <span>New Order</span>
              </Button>
            </NewOrderModal>
            <div className='w-60'>
              <SelectSymbol onChange={handleOnChange} selectedValue={chartSymbol} showLabel={false} />
            </div>
          </div>
        </div>
      </Box>

      <Box size='md'>

        <CandleChart symbol={chartSymbol} />

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
              <WalletTable walletBalance={wallet} />
            </div>
          </div>
        </div>
      </Box>
    </main>
  )
}
