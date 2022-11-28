import { Calculator } from 'phosphor-react'
import { useMemo } from 'react'
import { OrderInterface, SymbolsInterface, WalletProps } from '../shared/types'
import { InputText } from './InputText'

interface QuantityInputProps {
  id: string
  name: string
  value: string
  disabled: boolean
  order: OrderInterface
  wallet: WalletProps[]
  symbol: SymbolsInterface
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export function QuantityInput ({ id, name, value, disabled, order, wallet, symbol, onChange }: QuantityInputProps) {
  function handleCalc () {
    if (!wallet) return

    let qty: string

    if (order.side === 'SELL') {
      const baseAsset = wallet.find(item => item.symbol === symbol.base)
      const baseAmount = baseAsset?.available
      qty = baseAmount ?? '0'
      onChange({ target: { id, value: qty } } as React.ChangeEvent<HTMLInputElement>)
    } else {
      const quoteAsset = wallet.find(item => item.symbol === symbol.quote)
      const quoteAmount = parseFloat(quoteAsset?.available ?? '0')
      qty = Math.floor((quoteAmount / parseFloat(order.price))).toFixed(0)
      onChange({ target: { id, value: qty } } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const QuantityInputMemo = useMemo(() => {
    return (
      <InputText.Root title={`${name}:`}>
        <InputText.Icon className='p-0 h-full'>
          <button type='button' className='h-full flex items-center px-4 text-xl  rounded-tl-md rounded-bl-md border-0 bg-violet-700' onClick={handleCalc} >
            <Calculator size={24} weight={'fill'} />
          </button>
        </InputText.Icon>
        <InputText.Input disabled={disabled} required type={'number'} name={name} id={id} placeholder={symbol.minLotSize} value={value} onChange={(event) => onChange(event)} />
      </InputText.Root>
    )
  }, [order, wallet, symbol])

  return (
    QuantityInputMemo
  )
}
