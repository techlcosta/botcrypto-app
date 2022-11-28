import { useEffect, useMemo, useState } from 'react'
import { BookOrderInterface } from '../../../shared/types'

interface BookOrderStateInterface {
  updateId?: number
  symbol?: string
  bestBid: string
  bestBidQty?: string
  bestAsk: string
  bestAskQty?: string
}

interface RowProps {
  books: BookOrderInterface
  symbol: string
}

export function BooksRow ({ books, symbol }: RowProps) {
  const [book, setBook] = useState<BookOrderStateInterface>({
    bestBid: '0',
    bestAsk: '0'
  })

  useEffect(() => {
    if (books[symbol]) {
      setBook(books[symbol])
    }
  }, [books[symbol]])

  const booksRow = useMemo(() => {
    return (
      <tr className='bg-slate-800 hover:opacity-70'>
        <td className='py-3 px-2 text-center rounded-tl-md rounded-bl-md'>{symbol}</td>
        <td className='py-3 px-2 text-center'>{book.bestBid.substring(0, 8)}</td>
        <td className='py-3 px-2 text-center rounded-tr-md rounded-br-md'>{book.bestAsk.substring(0, 8)}</td>
      </tr>
    )
  }, [book])

  return (
    booksRow
  )
}
