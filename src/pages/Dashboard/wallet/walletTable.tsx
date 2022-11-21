import { useEffect, useState } from 'react'
import { getBalance } from '../../../services/api.servives'
import { BalanceInterface } from '../dashboard'
import { WalletRow } from './walletRow'

export interface WalletRowProps {
  symbol: string
  available: string
  onOrder: string
}

export function WalletTable ({ balanceStream }: { balanceStream: BalanceInterface }) {
  const [balance, setBalance] = useState<WalletRowProps[]>([])

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

          setBalance([...balanceWallet])
        }
      })
      .catch(err => console.log(err))
  }, [balanceStream])

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
        {balance.map(item => {
          return (
            <WalletRow key={item.symbol} Row={item}/>
          )
        })}
      </tbody>
    </table>
  )
}
