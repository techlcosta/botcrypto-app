
import { MarketTickerInterface, SymbolsInterface } from '../dashboard'
import { TickersRow } from './tickersRow'

interface TableProps {
  symbols: SymbolsInterface[]
  tickers: MarketTickerInterface
}

export function TickersTable ({ symbols, tickers }: TableProps) {
  return (
    <table className='w-full border-separate border-spacing-y-3 mb-4'>
      <thead className='bg-black font-russo uppercase text-xl sticky top-0 z-10'>
        <tr>
          <th className='py-4 px-2 whitespace-nowrap  text-center rounded-tl-md rounded-bl-md'>Symbol</th>
          <th className='py-4 px-2 whitespace-nowrap  text-center'>Close</th>
          <th className='py-4 px-2 whitespace-nowrap  text-center'> Open</th>
          <th className='py-4 px-2 whitespace-nowrap  text-center'>High</th>
          <th className='py-4 px-2 whitespace-nowrap  text-center rounded-tr-md rounded-br-md'>Low</th>
        </tr>
      </thead>
      <tbody>
        {symbols.map(item => {
          const { id, symbol } = item
          return (
            <TickersRow symbol={symbol} tickers={tickers} key={id} />
          )
        })}
      </tbody>
    </table>
  )
}
