
import { SymbolsInterface } from '../../shared/types'
import { SymbolsTableRow } from './symbolsTableRow'

interface TableProps {
  symbols: SymbolsInterface[]
  callback: () => Promise<void>
}

export function SymbolsTableBody ({ symbols, callback }: TableProps) {
  return (
    <table className='w-full border-separate border-spacing-y-3 mb-4 min-w-[820px]'>
      <thead className='bg-black font-russo uppercase text-xl '>
        <tr>
          <th className='py-6 px-2 whitespace-nowrap text-center rounded-tl-md rounded-bl-md'>Symbol</th>
          <th className='py-6 px-2 whitespace-nowrap text-center'>Base Prec</th>
          <th className='py-6 px-2 whitespace-nowrap text-center'> Quote Prec</th>
          <th className='py-6 px-2 whitespace-nowrap text-center'>Min Notional</th>
          <th className='py-6 px-2 whitespace-nowrap text-center'>Min Lot Size</th>
          <th className='py-6 px-2 whitespace-nowrap text-center rounded-tr-md rounded-br-md'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {symbols.map((symbol) => {
          return <SymbolsTableRow key={symbol.id} row={symbol} callback={callback} />
        })}
      </tbody>
    </table>
  )
}
