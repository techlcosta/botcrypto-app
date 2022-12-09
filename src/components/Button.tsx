
import React, { ReactNode } from 'react'

interface ButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  width: 'w-full' | 'w-fit'
  color?: 'red' | 'violet'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonRootProps>(({ children, width, color, ...props }, ref) => {
  return <button
    ref={ref}
    className={`h-12 ${width} flex justify-center items-center gap-2 text-gray-100 px-8 rounded-md border-2 border-transparent transition-colors outline-none duration-500 ${color && color === 'red' ? 'bg-red-500 hover:bg-red-600 disabled:opacity-70 disabled:bg-red-600  focus-visible:border-red-600' : 'bg-violet-500 hover:bg-violet-600 disabled:opacity-70 disabled:bg-violet-600  focus-visible:border-violet-600'} disabled:cursor-not-allowed`}
    {...props}>{children}
  </button>
})

Button.displayName = 'Button'
