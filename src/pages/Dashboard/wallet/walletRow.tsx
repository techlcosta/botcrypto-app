import { useMemo } from 'react'
import { WalletProps } from '../../../shared/types'

export function WalletRow ({ Row }: { Row: WalletProps }) {
  const tickersRow = useMemo(() => {
    return (
      <tr className='bg-slate-800 hover:opacity-70'>
        <td className='py-3 px-2 text-center rounded-tl-md rounded-bl-md'>{Row.symbol}</td>
        <td className='py-3 px-2 text-center'>{Row.available.substring(0, 8)}</td>

        <td className='py-3 px-2 text-center rounded-tr-md rounded-br-md'>{Row.onOrder.substring(0, 8)}</td>
      </tr>
    )
  }, [Row])

  return (
    tickersRow
  )
}
