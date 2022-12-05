import { ArrowsClockwise, CreditCard } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Box } from '../../components/Box'
import { Button } from '../../components/Button'
import { ErrorMessage } from '../../components/ErrorMSG'
import { NewOrderModal } from '../../components/NewOrderModal'
import { Pagination } from '../../components/Pagination'
import { useGetQuery } from '../../hooks/useGetQuery'
import { useOnError } from '../../hooks/useOnError'
import { getBalance } from '../../services/exchange.api'
import { getOrders, OrderInterface } from '../../services/orders.api'
import { BalanceInterface, WalletProps } from '../../shared/types'
import { OrdersTableBody } from './ordersTableBody'

export function Orders () {
  const query = useGetQuery('page')
  const [wallet, setWallet] = useState<WalletProps[]>([])
  const [orders, setOrders] = useState<OrderInterface[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isSyncing, setSyncing] = useState<boolean>(false)
  const [page, setPage] = useState<number>(query)
  const [pagesQTY, setPagesQTY] = useState<number>(1)

  console.log(query)

  async function handleGetOrders () {
    const response = await getOrders({ page })
    if (response.data) {
      setOrders(response.data.orders)
      setPagesQTY(response.data.pages)
    }
  }

  async function handleSync () {
    setError(null)
    setSyncing(true)
  }

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
          setWallet([...balanceWallet])
        }
      })
      .catch(err => {
        const response = useOnError(err)
        if (response) toast.error(response)
      })
  }, [])

  useEffect(() => {
    handleGetOrders()
      .catch(err => {
        const response = useOnError(err)
        if (response) toast.error(response)
      })
  }, [page])

  useEffect(() => {
    setPage(query)
  }, [query])

  return (
    <main className='px-8 pb-4 w-screen h-full flex flex-col gap-6 overflow-auto'>
      <Box mt='sm' size='sm'>
        <div className='w-full h-full flex items-center justify-between'>
          <h1 className='text-xl'>Orders</h1>
          <NewOrderModal wallet={wallet} callback={handleGetOrders}>
            <Button type='button' width='w-fit'>
              <CreditCard size={20} weight={'fill'} />
              <span>New Order</span>
            </Button>
          </NewOrderModal>
        </div>
      </Box>

      <Box>
        <OrdersTableBody orders={orders} />
        <div className='flex items-center gap-8'>
          <Button type='button' width='w-fit' disabled={isSyncing} onClick={handleSync} >
            <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
            <i className={isSyncing ? 'transition-all duration-500 motion-safe:animate-spin' : ''}>
              <ArrowsClockwise size={20} />
            </i>
          </Button>
          {error && <ErrorMessage title={error} />}
        </div>
        <Pagination pagesQTY={pagesQTY}/>
      </Box>

    </main>
  )
}
