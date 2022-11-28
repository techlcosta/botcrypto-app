
import React, { ReactNode } from 'react'

interface ButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  width: 'w-full' | 'w-fit'

}

export const Button = React.forwardRef<HTMLButtonElement, ButtonRootProps>(({ children, width, ...props }, ref) => {
  return <button ref={ref} className={`h-12 ${width} flex justify-center items-center gap-2 text-gray-100 px-8 rounded-md border-2 border-transparent transition-colors outline-none duration-500 bg-violet-500 hover:bg-violet-600 disabled:opacity-70 disabled:bg-violet-600 disabled:cursor-not-allowed focus-visible:border-violet-600 `} {...props}>{children}</button>
})

Button.displayName = 'Button'
