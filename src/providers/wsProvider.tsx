import { ReactNode, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useWebSocket from 'react-use-websocket'
import { AuthContext } from '../context/authContext'
import { WsContext } from '../context/wsContext'
import { OrderInterface, WsBalanceInterface, WsBookOrderInterface, WsMarketTickerInterface } from '../shared/types'

interface WsProviderProps {
  children: ReactNode
}

interface LastJsonMessageInterface {
  miniTickerStream: WsMarketTickerInterface
  bookTickersStream: WsBookOrderInterface[]
  balanceStream: WsBalanceInterface
  executionStream: OrderInterface
}

export function WsProvider ({ children }: WsProviderProps) {
  const { token } = useContext(AuthContext)
  const [execution, setExecution] = useState<OrderInterface | null>(null)

  const { lastJsonMessage } = useWebSocket(import.meta.env.VITE_APP_WS_URL, {
    onOpen: () => console.log('Connected on executionStream '),
    onMessage: () => {
      if (lastJsonMessage) {
        const { executionStream } = lastJsonMessage as unknown as LastJsonMessageInterface

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
    <WsContext.Provider value={{}}>

      {children}

    </WsContext.Provider>
  )
}
