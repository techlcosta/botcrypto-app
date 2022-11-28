import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { ReactNode } from 'react'
import { Button } from './Button'

interface ModalProps {
  children: ReactNode
  icon?: ReactNode
  title: string
}
export function Modal ({ children, icon, title }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button width='w-fit'>
          <span>{title}</span>
          {icon && <i>{icon}</i>}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.75)] overflow-hidden z-20'>
          <Dialog.Content className='relative w-full h-full flex justify-center items-center border-0 outline-none overflow-auto'>
            <section className='relative w-fit h-fit'>
              <Dialog.Close asChild className='absolute right-4 top-4 cursor-pointer hover:opacity-75'>
                <i> <X size={20} /></i>
              </Dialog.Close>
              {children}
            </section>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
