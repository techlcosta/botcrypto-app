import { formatDistance } from 'date-fns'

import { Eye } from 'phosphor-react'
import { OrderInterface } from '../../shared/types'
import { OrderDetailsModal } from './ordersDetailsModal'

interface RowProps {
  row: OrderInterface

}

export function SymbolsTableRow ({ row }: RowProps) {
  const date = formatDistance(new Date(), new Date(Number(row.transactionTime)))

  return (
    <tr className='bg-slate-800 hover:opacity-70'>
      <td className='py-2 px-2 text-center rounded-tl-md rounded-bl-md'>{row.symbol}</td>
      <td className='py-2 px-2 text-center'>{date}</td>
      <td className='py-2 px-2 text-center'>{row.side}</td>
      <td className='py-2 px-2 text-center'>{row.quantity}</td>
      <td className='py-2 px-2 text-center'>
      <span className={`px-2 text-white rounded-3xl ${row.status === 'FILLED' ? 'text-green-600' : (row.status === 'CANCELED' || row.status === 'REJECTED') ? 'text-red-600' : 'text-violet-500'}`} >
        {row.status}
      </span>
        </td>
      <td className='py-2 px-2 text-center rounded-tr-md rounded-br-md'>
        <div id={`edit${row.symbol}`} className='w-full flex justify-center'>
          <OrderDetailsModal order={row} >
          <button className='px-4 py-2 rounded-md bg-blue-900 transition-all duration-300 motion-safe:hover:scale-110  text-white cursor-pointer border-2 border-transparent outline-none focus-visible:border-violet-600'>
            <Eye size={24} weight={'fill'} />
          </button>
          </OrderDetailsModal>
        </div>
      </td>
    </tr>
  )
}
