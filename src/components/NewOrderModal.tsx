import * as Dialog from '@radix-ui/react-dialog'
import { CurrencyCircleDollar, StopCircle, X } from 'phosphor-react'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { getSymbols } from '../services/api.servives'
import { OrderInterface, SymbolsInterface, WalletProps } from '../shared/types'
import { Button } from './Button'
import { ErrorMessage } from './ErrorMSG'
import { InputText } from './InputText'
import { QuantityInput } from './QuantityInput'
import { SelectSide } from './SelectSide'
import { SelectSymbol } from './SelectSymbol'
import { SelectType } from './SelectType'
import { BookInterface, SymbolPrice } from './SymbolPrice'
import { UniquePrice } from './UniquePrice'
import { WalletSummary } from './WalletSummary'

interface NewOrderModalProps {
  children: ReactNode
  wallet: WalletProps[]
}

export function NewOrderModal ({ children, wallet }: NewOrderModalProps) {
  const INITIAL_ORDER: OrderInterface = {
    symbol: 'BTCBUSD',
    price: '',
    stopPrice: '',
    quantity: '',
    icebergQty: '',
    side: 'BUY',
    type: 'LIMIT'
  }

  const totalRef = useRef<HTMLSpanElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderInterface>(INITIAL_ORDER)
  const [symbol, setSymbol] = useState<SymbolsInterface>({} as SymbolsInterface)

  function handleOnChange (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    setOrder((state) => ({ ...state, [event.target.id]: event.target.value }))
  }

  function reset () {
    setOrder(INITIAL_ORDER)
  }

  function handleOnSubmit (event: React.FormEvent) {
    event.preventDefault()
    console.log(order)
  }

  function onPriceChange (book: BookInterface): void {
    setError(null)

    if (!totalRef.current?.innerText) return

    const quantity = parseFloat(order.quantity)

    if (order.type === 'MARKET' && quantity) {
      if (order.side === 'BUY') totalRef.current.innerText = (quantity * parseFloat(book.ask)).toFixed(2)

      if (order.side === 'SELL') totalRef.current.innerText = (quantity * parseFloat(book.bid)).toFixed(2)

      if (parseFloat(totalRef.current.innerText) < parseFloat(symbol.minNotional)) setError(`ERROR: Min Notional ${symbol.minNotional}`)
    }
  }

  useEffect(() => {
    getSymbols()
      .then(response => {
        if (response.data) {
          const responseSymbol = (response.data as SymbolsInterface[]).find(item => item.symbol === order.symbol)

          if (responseSymbol) setSymbol(responseSymbol)
        }
      })
      .catch(err => console.log(err))
  }, [order.symbol])

  useEffect(() => {
    setError(null)

    const quantity = parseFloat(order.quantity)

    if (quantity && quantity < parseFloat(symbol.minLotSize)) {
      return setError(`ERROR: Min Lot Size ${symbol.minLotSize}`)
    }

    if (order.type === 'ICEBERG') {
      const iceberg = parseFloat(order.icebergQty)

      if (iceberg && iceberg < parseFloat(symbol.minLotSize)) {
        return setError(`ERROR: Min Lot Size (Iceberg) ${symbol.minLotSize}`)
      }
    }

    const price = parseFloat(order.price)

    if (!quantity || !price) {
      if (totalRef.current?.innerText) totalRef.current.innerText = '0'

      return
    }

    const total = quantity * price

    if (totalRef.current?.innerText) totalRef.current.innerText = total.toFixed(2)

    if (total < parseFloat(symbol.minNotional)) {
      return setError(`ERROR: Min Notional ${symbol.minNotional}`)
    }
  }, [order.quantity, order.price, order.icebergQty])

  return (
    <Dialog.Root onOpenChange={reset}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.75)] overflow-hidden z-20'>
          <Dialog.Content className='relative w-full h-full flex justify-center items-center border-0 outline-none overflow-auto'>
            <section className='relative w-fit h-fit'>

              <Dialog.Close asChild className='absolute right-4 top-4 cursor-pointer hover:opacity-75'>
                <i> <X size={20} /></i>
              </Dialog.Close>

              <form className='min-w-[580px] max-w-[660px] bg-slate-900 grid grid-cols-12 gap-x-4 gap-y-6 p-10 rounded-md' onSubmit={handleOnSubmit}>
                <header className='col-span-12 w-full'>
                  <h1 className='text-xl'>New Order</h1>
                </header>

                <div className='col-span-6 w-full'>
                  <SelectSymbol onChange={handleOnChange} selectedValue={order.symbol} />
                </div>

                <div className='col-span-6 w-full'>
                  <SymbolPrice onChange={onPriceChange} symbol={order.symbol} />
                </div>

                <div className='col-span-12 w-full'>
                  <WalletSummary symbol={symbol} wallet={wallet} />
                </div>

                <div className='col-span-6 w-full'>
                  <SelectSide side={order.side} onChange={handleOnChange} />
                </div>

                <div className='col-span-6 w-full'>
                  <SelectType type={order.type} onChange={handleOnChange} />
                </div>

                {order.type !== 'MARKET' &&
                  <div className='col-span-6 w-full'>
                    <UniquePrice type={order.type} price={order.price} onChange={handleOnChange} />
                  </div>
                }

                <div className='col-span-6 w-full'>
                  <QuantityInput id='quantity' name='Quantity:' value={order.quantity} disabled={false} order={order} symbol={symbol} wallet={wallet} onChange={handleOnChange} />
                </div>

                {order.type === 'ICEBERG' &&
                  <div className='col-span-6 w-full'>
                    <QuantityInput id='icebergQty' name='Iceberg Qty:' value={order.icebergQty} disabled={order.type !== 'ICEBERG'} order={order} symbol={symbol} wallet={wallet} onChange={handleOnChange} />
                  </div>
                }
                {(order.type === 'STOP_LOSS' || order.type === 'STOP_LOSS_LIMIT' || order.type === 'TAKE_PROFIT' || order.type === 'TAKE_PROFIT_LIMIT') &&
                  <div className='col-span-6 w-full'>
                    <InputText.Root title='Stop Price:'>
                      <InputText.Icon>
                        <StopCircle size={24} weight={'fill'} />
                      </InputText.Icon>
                      <InputText.Input type='number' id='stopPrice' name='Stop Price' onChange={handleOnChange} placeholder='0' />
                    </InputText.Root>
                  </div>
                }

                <div className="col-span-6 w-full">
                  <label className='w-full'>Total:</label>
                  <div className='h-12 w-full flex items-center bg-gray-900 text-gray-400 border-solid border-2 border-gray-700 rounded-md'>
                    <i className='h-full flex items-center px-4 text-xl  rounded-tl-md rounded-bl-md border-0 bg-gray-800'>
                      <CurrencyCircleDollar size={24} weight={'fill'} />
                    </i>
                    <span ref={totalRef} className='px-4' >0</span>
                  </div>
                </div>

                <div className='col-span-12 w-full mt-4 flex gap-4'>
                  <Button disabled={!!error || (!(order.type === 'MARKET') && !order.price) || !order.quantity || (order.type === 'ICEBERG' && !order.icebergQty)} width='w-fit' type='submit'>
                    <span>Send</span>
                  </Button>
                  {error && <ErrorMessage title={error} />}
                </div>

              </form>
            </section>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
