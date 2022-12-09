import { ArrowsClockwise } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Box } from '../../components/Box'
import { Button } from '../../components/Button'
import { ErrorMessage } from '../../components/ErrorMSG'
import { Pagination } from '../../components/Pagination'
import { SelectQuote } from '../../components/SelectQuote'
import { useGetQuery } from '../../hooks/useGetQuery'
import { useOnError } from '../../hooks/useOnError'
import { usePersistedState } from '../../hooks/usePersistState'
import { getSymbols, syncSymbols } from '../../services/symbols.api'
import { SymbolsInterface } from '../../shared/types'
import { SymbolsTableBody } from './symbolsTableBody'

type QuotesType = 'FAVORITES' | 'USD' | 'EUR' | 'BNB' | 'ETH' | 'BTC' | 'USDT'

export function SymbolsPage () {
  const query = useGetQuery('page')
  const [symbols, setSymbols] = useState<SymbolsInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(query)
  const [pagesQTY, setPagesQTY] = useState<number>(1)
  const [isSyncing, setSyncing] = useState<boolean>(false)
  const [defaultQuote, setDefaultQuote] = usePersistedState<QuotesType>('BOTCRYPTO_QUOTE_SYMBOLS', 'FAVORITES')

  async function handleGetSymbols (): Promise<void> {
    const symbol = defaultQuote !== 'FAVORITES' ? defaultQuote : undefined
    const onlyFavorites = defaultQuote === 'FAVORITES' ? true : undefined
    const response = await getSymbols({ page, symbol, onlyFavorites })

    setPagesQTY(response.pages)
    setSymbols(response.symbols)
  }

  async function handleSync (): Promise<void> {
    setError(null)
    setSyncing(true)

    try {
      await syncSymbols()

      await handleGetSymbols()

      toast.success('Success!')

      setSyncing(false)
    } catch (error: any) {
      useOnError(error)

      setSyncing(false)

      if (error instanceof Error) setError(error.message)
    }
  }

  function handleSelect (event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as QuotesType

    setDefaultQuote(value)
  }

  useEffect(() => {
    handleGetSymbols().catch(err => useOnError(err))
  }, [defaultQuote, page])

  useEffect(() => { setPage(query) }, [query])

  return (
    <main className='px-8 pb-4 w-full h-full flex flex-col gap-8 overflow-auto'>
      <Box mt='md' size='sm'>
        <div className='w-full h-full relative flex items-center min-w-full justify-between'>
          <h1 className='text-xl'>Symbols</h1>
          <SelectQuote defaultQuote={defaultQuote} onChange={(e) => handleSelect(e)} />
        </div>
      </Box>

      <Box>
        <SymbolsTableBody symbols={symbols} callback={handleGetSymbols} />
        <div className='flex items-center gap-8'>
          <Button type='button' width='w-fit' disabled={isSyncing} onClick={handleSync}>
            <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
            <i className={isSyncing ? 'transition-all duration-500 motion-safe:animate-spin' : ''}>
              <ArrowsClockwise size={20} />
            </i>
          </Button>
          {error && <ErrorMessage title={error} />}
        </div>
        <Pagination pagesQTY={pagesQTY} path={'symbols'} query={query} />
      </Box>
    </main >
  )
}
