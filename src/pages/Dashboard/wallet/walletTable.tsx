import { WalletProps } from '../../../shared/types'
import { WalletRow } from './walletRow'

export function WalletTable ({ walletBalance }: { walletBalance: WalletProps[] }) {
  return (
    <table className='w-full border-separate border-spacing-y-3 mb-4'>
      <thead className='bg-black font-russo uppercase text-xl sticky top-0 z-10'>
        <tr>
          <th className='py-4 px-2 whitespace-nowrap  text-center rounded-tl-md rounded-bl-md'>Symbol</th>
          <th className='py-4 px-2 whitespace-nowrap  text-center'>Free</th>
          <th className='py-4 px-2 whitespace-nowrap  text-center rounded-tr-md rounded-br-md'>Look</th>
        </tr>
      </thead>
      <tbody>
        {walletBalance.map(item => {
          return (
            <WalletRow key={item.symbol} Row={item}/>
          )
        })}
      </tbody>
    </table>
  )
}
