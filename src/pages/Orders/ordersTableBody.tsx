
import { OrderInterface } from '../../shared/types'
import { SymbolsTableRow } from './ordersTableRow'

interface TableProps {
  orders: OrderInterface[]
}

export function OrdersTableBody ({ orders }: TableProps) {
  return (
    <table className='w-full border-separate border-spacing-y-3 mb-4 min-w-[820px]'>
      <thead className='bg-black font-russo uppercase text-xl '>
        <tr>
          <th className='py-6 px-2 whitespace-nowrap text-center rounded-tl-md rounded-bl-md'>Symbol</th>
          <th className='py-6 px-2 whitespace-nowrap text-center'>Date</th>
          <th className='py-6 px-2 whitespace-nowrap text-center'>Side</th>
          <th className='py-6 px-2 whitespace-nowrap text-center'>QTY</th>
          <th className='py-6 px-2 whitespace-nowrap text-center'>Status</th>
          <th className='py-6 px-2 whitespace-nowrap text-center rounded-tr-md rounded-br-md'>Datails</th>
        </tr>
      </thead>
      <tbody>
        { orders.map((order) => {
          return <SymbolsTableRow key={order.id} row={order} />
        })}
      </tbody>
    </table>
  )
}
