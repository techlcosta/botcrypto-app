import { ArrowsClockwise } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Box } from '../../components/Box'
import { Button } from '../../components/Button'
import { SelectQuote } from '../../components/SelectQuote'
import { usePersistedState } from '../../hooks/usePersistState'
import { getSymbols, syncSymbols } from '../../services/api.servives'
import { SymbolsTableBody } from './symbolsTableBody'

export interface SymbolsInterface {
  id: string
  symbol: string
  basePrecision: number
  quotePrecision: number
  minNotional: string
  minLotSize: string
  isFavorite: boolean
  updatedAt: Date
  createdAt: Date
}

export function SymbolsPage () {
  const [symbols, setSymbols] = useState<SymbolsInterface[]>([])
  const [isSyncing, setSyncing] = useState<boolean>(false)
  const [defaultQuote, setDefaultQuote] = usePersistedState<string>('BOTCRYPTO_QUOTE_SYMBOLS', 'FAVORITES')

  async function handleGetSymbols (): Promise<void> {
    const response = await getSymbols()

    const symbols = response.data.filter((symbol: SymbolsInterface) => {
      if (defaultQuote === 'FAVORITES') {
        return symbol.isFavorite
      } else {
        return symbol.symbol.endsWith(defaultQuote)
      }
    })

    setSymbols(symbols)
  }

  async function handleSync (): Promise<void> {
    setSyncing(true)

    await syncSymbols()

    await handleGetSymbols()

    setSyncing(false)
  }

  function handleSelect (event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    setDefaultQuote(value)
  }

  useEffect(() => {
    handleGetSymbols().catch(err => console.log(err))
  }, [defaultQuote])

  return (
    <main className='px-8 pb-4 w-full h-full flex flex-col gap-8 overflow-auto'>
      <Box mt='md' size='sm'>
        <div className='w-full h-full relative flex items-center min-w-[820px] justify-between'>
          <h1 className='text-xl'>Symbols</h1>
          <SelectQuote defaultQuote={defaultQuote} onChange={(e) => handleSelect(e)} />
        </div>
      </Box>

      <Box>
        <SymbolsTableBody symbols={symbols} callback={handleGetSymbols} />
        <Button type='button' width='w-fit' disabled={isSyncing} onClick={handleSync}>
          <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
          <i className={isSyncing ? 'transition-all duration-500 motion-safe:animate-spin' : ''}>
            <ArrowsClockwise size={20} />
          </i>
        </Button>
      </Box>
    </main >
  )
}
