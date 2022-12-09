import * as Dialog from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { Backspace, X } from 'phosphor-react'
import { ReactNode, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { ErrorMessage } from '../../components/ErrorMSG'
import { useOnError } from '../../hooks/useOnError'
import { cancelOrder } from '../../services/orders.api'

import { OrderInterface } from '../../shared/types'

interface SymbolsModalProps {
  children: ReactNode
  order: OrderInterface

}
export function OrderDetailsModal ({ children, order }: SymbolsModalProps) {
  const [error, setError] = useState<string | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const date = format(new Date(Number(order.transactionTime)), 'yyyy/MM/dd, HH:mm:ss')

  async function handleCancel () {
    try {
      setError(null)
      await cancelOrder({ symbol: order.symbol, orderId: order.orderId })
      if (buttonRef.current?.click) buttonRef.current.click()
      toast.success('Success!')
    } catch (error: any) {
      useOnError(error)
      setError(error.message)
    }
  }

  return (
    <Dialog.Root onOpenChange={() => setError(null)}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.75)] overflow-hidden z-20'>
          <Dialog.Content className='relative w-full h-full flex justify-center items-center border-0 outline-none overflow-auto'>
            <main className='relative w-fit h-fit'>
              <Dialog.Close asChild className='absolute right-4 top-4 cursor-pointer hover:opacity-75'>
                <button ref={buttonRef} className='border-2 border-transparent rounded-md outline-none focus-visible:border-violet-600'> <X size={20} /></button>
              </Dialog.Close>

              <section className='min-w-[580px] max-w-[720px] bg-slate-900 grid grid-cols-12 gap-x-2 gap-y-8 p-10 rounded-md text-gray-400 whitespace-nowrap'>
                <h1 className='col-span-12 text-xl text-center font-russo mb-4'>Orders Details</h1>

                <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Symbol:</b>
                  <span>{order.symbol}</span>
                </div>

                <div className="col-span-6  flex gap-2">
                  <span className={`px-2 text-white rounded-3xl ${order.status === 'FILLED' ? 'bg-green-600' : (order.status === 'CANCELED' || order.status === 'REJECTED') ? 'bg-red-600' : 'bg-violet-500'}`} >
                    {order.status}
                  </span>
                </div>

                <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Order_ID:</b>
                  <span>{order.orderId} </span>
                </div>

                <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Client_ID:</b>
                  <span>{order.clientOrderId} </span>
                </div>

                <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Side:</b>
                  <span>{order.side}</span>
                </div>

                <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Type:</b>
                  <span>{order.type}</span>
                </div>

                <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Quantity:</b>
                  <span>{order.quantity.substring(0, 8)}</span>
                </div>

                {order.icebergQuantity && <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Iceberg Quantity:</b>
                  <span>{order.icebergQuantity.substring(0, 8)}</span>
                </div>
                }

                {order.limitPrice && <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Unit Price:</b>
                  <span>{order.limitPrice.substring(0, 8)}</span>
                </div>
                }

                {order.stopPrice && <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Stop Price:</b>
                  <span>{order.stopPrice.substring(0, 8)}</span>
                </div>
                }

                {order.avgPrice && <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Avg Price:</b>
                  <span>{order.avgPrice.substring(0, 8)}</span>
                </div>
                }

                {order.comission && <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Comission:</b>
                  <span>{order.comission.substring(0, 8)}</span>
                </div>
                }

                {order.net && <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Net:</b>
                  <span>{order.net.substring(0, 8)}</span>
                </div>
                }

                {order.obs && <div className="col-span-6 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Obs:</b>
                  <span>{order.obs}</span>
                </div>
                }

                <div className="col-span-12 flex gap-2">
                  <b className=' text-gray-200 uppercase'>Date:</b>
                  <span>{date}</span>
                </div>

                <div className='col-span-12 w-full mt-4 flex gap-4 justify-end'>
                  {error && <ErrorMessage title={error} />}
                  <Button width='w-fit' type='button' color='red' disabled={order.status !== 'NEW'} onClick={handleCancel}>
                    <Backspace size={24} />
                    <span>Cancel</span>
                  </Button>
                </div>
              </section>
            </main>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
