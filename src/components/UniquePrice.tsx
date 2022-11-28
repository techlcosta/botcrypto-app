import { Coins } from 'phosphor-react'
import React, { useMemo } from 'react'
import { TypeOrderType } from '../shared/types'
import { InputText } from './InputText'

interface UniquePriceProps {
  type: TypeOrderType
  price: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export function UniquePrice ({ type, price, onChange }: UniquePriceProps) {
  const UniquePriceMemo = useMemo(() => {
    return (
      <InputText.Root title='Unique Price:'>
        <InputText.Icon>
          <Coins size={24} weight={'fill'} />
        </InputText.Icon>
        <InputText.Input disabled={type === 'MARKET'} required type={'number'} name='price' id='price' placeholder='0' value={price} onChange={(event) => onChange(event)} />
      </InputText.Root>
    )
  }, [type, price])

  return (
    UniquePriceMemo
  )
}
