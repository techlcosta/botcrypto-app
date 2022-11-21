import { ReactNode } from 'react'

interface BoxProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  mt?: 'sm' | 'md' | 'lg'
  position?: 'sticky'
}

export function Box ({ children, size, position, mt }: BoxProps) {
  return <div className={` w-full min-w-fit  bg-slate-900 rounded-md
  ${position === 'sticky' ? 'sticky top-0 z-10' : 'relative'} 
  ${mt === 'lg' ? 'mt-12' : mt === 'md' ? 'mt-8' : mt === 'sm' ? 'mt-4' : 'mt-0'} 
  ${size === 'sm' ? 'p-4' : size === 'lg' ? 'p-12' : size === 'md' ? 'p-8' : 'p-8'} 
  `}>
    {children}
  </div>
}
