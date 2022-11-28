import { BookOrderInterface, SymbolsInterface } from '../../../shared/types'
import { BooksRow } from './booksRow'

interface TableProps {
  symbols: SymbolsInterface[]
  books: BookOrderInterface
}

export function BooksTable ({ symbols, books }: TableProps) {
  return (
    <table className='w-full border-separate border-spacing-y-3 mb-4'>
      <thead className='bg-black font-russo uppercase text-xl sticky top-0 z-10'>
        <tr>
          <th className='py-4 px-2 whitespace-nowrap text-center rounded-tl-md rounded-bl-md'>Symbol</th>
          <th className='py-4 px-2 whitespace-nowrap text-center'>Bid</th>
          <th className='py-4 px-2 whitespace-nowrap text-center rounded-tr-md rounded-br-md'>Ask</th>
        </tr>
      </thead>
      <tbody>
        {symbols.map(item => {
          const { id, symbol } = item
          return (
            <BooksRow symbol={symbol} books={books} key={id} />
          )
        })}
      </tbody>
    </table>
  )
}
