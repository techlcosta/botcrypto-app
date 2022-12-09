import { CreditCard, MagnifyingGlass } from 'phosphor-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '../../components/Box'
import { Button } from '../../components/Button'
import { InputText } from '../../components/InputText'
import { NewOrderModal } from '../../components/NewOrderModal'
import { Pagination } from '../../components/Pagination'
import { WsExectionsOrdersContext } from '../../context/wsExectionsOrdersContext'
import { useDebounce } from '../../hooks/useDebounce'
import { useGetQuery } from '../../hooks/useGetQuery'
import { useOnError } from '../../hooks/useOnError'
import { getBalance } from '../../services/exchange.api'
import { getOrders } from '../../services/orders.api'
import { BalanceInterface, OrderInterface, WalletProps } from '../../shared/types'
import { OrdersTableBody } from './ordersTableBody'

export function Orders () {
  const query = useGetQuery('page')
  const { debounce } = useDebounce()
  const { executionOrders } = useContext(WsExectionsOrdersContext)
  const [wallet, setWallet] = useState<WalletProps[]>([])
  const [orders, setOrders] = useState<OrderInterface[]>([])
  const [page, setPage] = useState<number>(query)
  const [pagesQTY, setPagesQTY] = useState<number>(1)

  const inputSearchRef = useRef<HTMLInputElement | null>(null)

  async function handleGetBalanceAndOrders (symbol?: string) {
    const responseBalance = await getBalance()
    if (responseBalance.data) {
      const balanceWallet = Object.entries(responseBalance.data as BalanceInterface).map(([key, value]) => {
        return {
          symbol: key,
          available: value.available,
          onOrder: value.onOrder
        }
      })
      setWallet([...balanceWallet])
    }

    const responseOrders = await getOrders({ page, symbol })
    if (responseOrders.data) {
      setOrders(responseOrders.data.orders)
      setPagesQTY(responseOrders.data.pages)
    }
  }

  function handleSearch (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    debounce(async () => await handleGetBalanceAndOrders(value))
  }

  useEffect(() => {
    const value = inputSearchRef.current?.value
    handleGetBalanceAndOrders(value).catch(err => useOnError(err))
  }, [page, executionOrders])

  useEffect(() => { setPage(query) }, [query])

  return (
    <main className='px-8 pb-4 w-screen h-full flex flex-col gap-6 overflow-auto'>
      <Box mt='sm' size='sm'>
        <div className='w-full min-w-full h-full flex items-center justify-between'>
          <h1 className='text-xl'>Orders</h1>
          <div className='h-full flex items-center gap-2 py-1'>
            <NewOrderModal wallet={wallet} callback={handleGetBalanceAndOrders} >
              <Button type='button' width='w-fit'>
                <CreditCard size={20} weight={'fill'} />
                <span className='whitespace-nowrap'>New Order</span>
              </Button>
            </NewOrderModal>
            <InputText.Root>
              <InputText.Icon><MagnifyingGlass size={24} /> </InputText.Icon>
              <InputText.Input ref={inputSearchRef} type={'text'} placeholder='Search symbol' onChange={handleSearch} />
            </InputText.Root>
          </div>

        </div>
      </Box>

      <Box>
        <OrdersTableBody orders={orders}/>
        <Pagination pagesQTY={pagesQTY} path={'orders'} query={query} />
      </Box>

    </main>
  )
}
