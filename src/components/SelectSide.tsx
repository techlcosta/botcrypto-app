import { useMemo } from 'react'
import { SideOrderType } from '../shared/types'

interface SelectSideProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  side: SideOrderType
}

export function SelectSide ({ side, ...props }: SelectSideProps) {
  const SelectSideMemo = useMemo(() => {
    return (
      <label className='w-full flex flex-col justify-center gap-1'>
        <span>Side:</span>
        <select name="side" id="side" defaultValue={side} required {...props} className='w-full h-12 px-2 outline-none bg-slate-800 border-solid border-2 border-gray-700 rounded-md focus-visible:border-violet-500'>
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
      </label>
    )
  }, [side])
  return (

    SelectSideMemo
  )
}
