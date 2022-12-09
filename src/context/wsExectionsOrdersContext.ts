import { createContext } from 'react'
import { OrderInterface } from '../shared/types'

interface WsExectionsOrdersContextProps {
  executionOrders: OrderInterface | null
}

export const WsExectionsOrdersContext = createContext<WsExectionsOrdersContextProps>({} as WsExectionsOrdersContextProps)
