import * as Dialog from '@radix-ui/react-dialog'
import { FloppyDisk, Star, X } from 'phosphor-react'
import React, { ReactNode, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { InputText } from '../../components/InputText'
import { updateSymbols } from '../../services/api.servives'
import { SymbolsInterface } from '../../shared/types'

interface SymbolsModalProps {
  children: ReactNode
  symbol: SymbolsInterface
  callback: () => Promise<void>
}
export function SymbolsModal ({ children, symbol, callback }: SymbolsModalProps) {
  const [fields, setFields] = useState<SymbolsInterface>(symbol)

  async function handleSave (event: React.FormEvent) {
    event.preventDefault()
    try {
      await updateSymbols(fields)
      await callback()
      toast.success('Success!')
    } catch (error) {
      toast.error('Update failed!')
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.75)] overflow-hidden z-20'>
          <Dialog.Content className='relative w-full h-full flex justify-center items-center border-0 outline-none overflow-auto'>
            <section className='relative w-fit h-fit'>
              <Dialog.Close asChild className='absolute right-4 top-4 cursor-pointer hover:opacity-75'>
                <button className='border-2 border-transparent rounded-md outline-none focus-visible:border-violet-600'> <X size={20} /></button>
              </Dialog.Close>

              <div className='w-full h-full flex flex-col justify-center items-center'>

                <form className='min-w-[580px] max-w-[660px] grid grid-cols-12 gap-x-4 gap-y-6 p-4 bg-slate-900 rounded-md opacity-100 uppercase text-sm' onSubmit={handleSave}>
                  <header className='col-span-12 mt-4 text-center' >
                    <h1 className='font-russo text-lg' >Edit Symbol</h1>
                  </header>

                  <div className='col-span-12 grid grid-cols-12 gap-4'>
                    <div className='col-span-6'>
                      <span className='block mb-1' >Symbol</span>
                      <button
                        type={'button'}
                        className='w-full h-12 flex bg-gray-900 border-solid border-2 border-gray-700 rounded-md outline-none focus-visible:border-violet-600'
                        onClick={() => setFields((state) => { return { ...state, isFavorite: !fields.isFavorite } })}
                      >
                        <div className='h-full w-full flex justify-center items-center'>{fields.symbol}</div>
                        <i className={`h-full w-16 bg-violet-600 flex justify-center items-center ${fields.isFavorite ? 'text-yellow-300' : 'text-white'}`}>
                          <Star size={24} weight={'fill'} />
                        </i>
                      </button>
                    </div>
                  </div>

                  <div className=' col-span-6'>
                    <span className='block mb-1' >Base Precision:</span>
                    <InputText.Root>
                      <InputText.Input
                        type={'number'}
                        defaultValue={fields.basePrecision}
                        onChange={(e) => setFields((state) => { return { ...state, basePrecision: Number(e.target.value) } })}
                      />
                    </InputText.Root>
                  </div>
                  <div className='w col-span-6'>
                    <span className='block mb-1' >Quote Precision:</span>
                    <InputText.Root>
                      <InputText.Input
                        type={'number'}
                        defaultValue={fields.quotePrecision}
                        onChange={(e) => setFields((state) => { return { ...state, quotePrecision: Number(e.target.value) } })}
                      />
                    </InputText.Root>
                  </div>

                  <div className='w col-span-6'>
                    <span className='block mb-1' >Min Notional:</span>
                    <InputText.Root>
                      <InputText.Input
                        type={'number'}
                        defaultValue={fields.minNotional}
                        onChange={(e) => setFields((state) => { return { ...state, minNotional: e.target.value } })}
                      />
                    </InputText.Root>
                  </div>
                  <div className='w col-span-6'>
                    <span className='block mb-1' >Min Lote Size:</span>
                    <InputText.Root>
                      <InputText.Input
                        type={'number'}
                        defaultValue={fields.minLotSize}
                        onChange={(e) => setFields((state) => { return { ...state, minLotSize: e.target.value } })}
                      />
                    </InputText.Root>
                  </div>

                  <Button type='submit' width='w-fit'>
                    <span>Save</span>
                    <FloppyDisk size={20} weight={'fill'} />
                  </Button>
                </form>
              </div>
            </section>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
