import { useMemo } from 'react'
import { TypeOrderType } from '../shared/types'

interface SelectTypeProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  type: TypeOrderType
}

export function SelectType ({ type, ...props }: SelectTypeProps) {
  const SelectTypeMemo = useMemo(() => {
    return (
      <label className='w-full flex flex-col justify-center gap-1'>
        <span>Type:</span>
        <select name="type" id="type" defaultValue={type} required {...props} className='w-full h-12 px-2 outline-none bg-slate-800 border-solid border-2 border-gray-700 rounded-md focus-visible:border-violet-500'>
          <option value="ICEBERG">Iceberg</option>
          <option value="LIMIT">Limit</option>
          <option value="MARKET">Market</option>
          <option value="STOP_LOSS">Stop Loss</option>
          <option value="STOP_LOSS_LIMIT">Stop Loss Limit</option>
          <option value="TAKE_PROFIT">Take Profit</option>
          <option value="TAKE_PROFIT_LIMIT">Take Profit Limit</option>
        </select>
      </label>
    )
  }, [type])
  return (

    SelectTypeMemo
  )
}
