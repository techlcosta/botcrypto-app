import { useMemo } from 'react'
import { SymbolsInterface, WalletProps } from '../shared/types'

interface WalletSummaryProps {
  wallet: WalletProps[]
  symbol: SymbolsInterface
}

export function WalletSummary ({ wallet, symbol }: WalletSummaryProps) {
  function getBaseAsset (): string {
    const baseAsset = wallet.find(item => item.symbol === symbol.base)

    if (!baseAsset) return '0'

    return `${symbol.base}: ${baseAsset.available}`
  }

  function getQuoteAsset (): string {
    const quoteAsset = wallet.find(item => item.symbol === symbol.quote)

    if (!quoteAsset) return '0'

    return `${symbol.quote}: ${quoteAsset.available}`
  }

  const Summary = useMemo(() => {
    return (
      <label className='w-full flex flex-col gap-1'>
        <span>You have:</span>
        <div className='w-full  flex justify-center items-center gap-4'>
          <div className='w-full bg-green-300 text-green-800 rounded-md px-2 py-1'>{getBaseAsset()}</div>
          <div className='w-full bg-indigo-300 text-indigo-800 rounded-md px-2 py-1'>{getQuoteAsset()}</div>
        </div>
      </label>
    )
  }, [symbol, wallet])
  return (
    Summary
  )
}
