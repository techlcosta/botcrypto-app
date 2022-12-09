import { ReactNode, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useWebSocket from 'react-use-websocket'
import { AuthContext } from '../context/authContext'
import { WsExectionsOrdersContext } from '../context/wsExectionsOrdersContext'
import { OrderInterface, WsBalanceInterface, WsBookOrderInterface, WsMarketTickerInterface } from '../shared/types'

interface WsExectionsOrdersProviderProps {
  children: ReactNode
}

interface LastJsonMessageInterface {
  miniTickerStream: WsMarketTickerInterface
  bookTickersStream: WsBookOrderInterface[]
  balanceStream: WsBalanceInterface
  executionStream: OrderInterface
  error: any
}

export function WsExectionsOrdersProvider ({ children }: WsExectionsOrdersProviderProps) {
  const { token } = useContext(AuthContext)
  const [execution, setExecution] = useState<OrderInterface | null>(null)

  const { lastJsonMessage } = useWebSocket(import.meta.env.VITE_APP_WS_URL, {
    onOpen: () => console.log('Connected on executionStream '),
    onMessage: () => {
      if (lastJsonMessage) {
        const { executionStream, error } = lastJsonMessage as unknown as LastJsonMessageInterface

        if (!executionStream && !error) return

        if (error) return toast.error('Update order failed!')

        if (executionStream && (executionStream.status === 'FILLED' || executionStream.status === 'CANCELED')) {
          setExecution(state => {
            if (state?.transactionTime !== executionStream.transactionTime) return { ...executionStream }
            return state
          })
        }
      }
    },
    onError: (err) => console.error(err),
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    protocols: token ?? ''
  })

  useEffect(() => {
    if (execution) toast(`Order has been ${execution.status}!`)
  }, [execution])

  return (
    <WsExectionsOrdersContext.Provider value={{ executionOrders: execution }}>
      {children}
    </WsExectionsOrdersContext.Provider>
  )
}
