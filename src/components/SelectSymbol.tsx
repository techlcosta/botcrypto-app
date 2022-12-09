import { Star } from 'phosphor-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getSymbols } from '../services/symbols.api'

import { SymbolsInterface } from '../shared/types'

interface SelectSymbolProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  isOnlyFavorites?: boolean
  disabled?: boolean
  selectedValue: string
  showLabel: boolean
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SelectSymbol = ({ isOnlyFavorites = true, disabled, showLabel, selectedValue, defaultValue, onChange, ...props }: SelectSymbolProps) => {
  const selectRef = useRef<HTMLSelectElement | null>(null)
  const [symbols, setSymbols] = useState<string[]>(['Loading...'])
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(isOnlyFavorites)

  function handleOnlyFavorites () {
    setOnlyFavorites(!onlyFavorites)
  }

  useEffect(() => {
    getSymbols()
      .then(response => {
        if (response) {
          const symbolsName: string[] = onlyFavorites
            ? (response.symbols.filter((symbol: SymbolsInterface) => symbol.isFavorite)).map((symbol: SymbolsInterface) => symbol.symbol)
            : response.symbols.map((symbol: SymbolsInterface) => symbol.symbol)
          if (symbolsName.length) {
            setSymbols(symbolsName)
          } else {
            setSymbols(['NO SYMBOLS'])
          }
        }
      })
      .catch(err => console.error(err))
  }, [onlyFavorites])

  useEffect(() => {
    if (selectRef.current?.value !== undefined && symbols[0] !== 'Loading...') {
      if (symbols.every(symbol => symbol !== selectedValue)) {
        selectRef.current.value = symbols[0]
        onChange({ target: { id: 'symbol', value: symbols[0] } } as React.ChangeEvent<HTMLSelectElement>)
      } else {
        selectRef.current.value = selectedValue
      }
    }
  }, [symbols])

  const Select = useMemo(() => {
    return (
      <label className='w-full flex flex-col justify-center items-center gap-1'>
        {showLabel && <div className='w-full text-left'>Symbols</div>}
        <div className='w-full h-12 flex justify-center items-center border-solid border-2 border-gray-700 rounded-md focus-within:border-violet-500'>
          <button
            disabled={disabled ?? false}
            type='button'
            className={`h-full w-16 flex justify-center items-center bg-violet-600 rounded-l-md outline-none ${onlyFavorites ? 'text-yellow-300' : 'text-white'} disabled:cursor-not-allowed`}
            onClick={handleOnlyFavorites}
          >
            <Star size={24} weight={'fill'} />
          </button>
          <select
            ref={selectRef}
            name="symbol"
            id="symbol"
            disabled={disabled ?? false}
            {...props}
            className='w-full h-full px-2 bg-slate-800 rounded-r-md outline-none disabled:cursor-not-allowed'
            onChange={(event) => onChange(event)}
          >
            {symbols.map((symbol, index) => <option key={index} value={symbol} >{symbol}</option>)}
          </select>
        </div>
      </label>

    )
  }, [symbols])
  return (
    Select
  )
}
