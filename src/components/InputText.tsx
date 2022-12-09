import React, { ReactNode } from 'react'

interface InputRootProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
}

interface InputIconProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
  title?: string
}

interface InputInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Root = function ({ children, title, ...props }: InputRootProps) {
  return (
    <label
      className='w-full flex flex-col justify-center gap-1'
      {...props}
    >
      {title && <span>{title}</span>}
      <div className='h-12 w-full flex items-center bg-gray-900 text-gray-400 border-solid border-2 border-gray-700 transition-colors duration-500 focus-within:border-violet-500 rounded-md [&:has(input:focus)]:text-violet-400 '>
        {children}
      </div>
    </label>
  )
}

const Icon = function ({ children, ...props }: InputIconProps) {
  return (
    <i
      className='h-full flex items-center px-4 text-xl  rounded-tl-md rounded-bl-md border-0 bg-gray-800'
      {...props}
    >
      {children}
    </i>
  )
}

const Input = React.forwardRef<HTMLInputElement, InputInputProps>(({ ...props }, ref) => {
  return (
    <input
      className='h-full w-full bg-transparent border-0 outline-none px-3 text-gray-200 disabled:cursor-not-allowed'
      {...props}
      ref={ref}
    />
  )
})

Input.displayName = 'Input'

export const InputText = {
  Root,
  Icon,
  Input
}
