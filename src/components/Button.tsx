import { ReactNode } from 'react'

interface ButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  width: 'w-full' | 'w-fit'

}

export const Button = function ({ children, width, ...props }: ButtonRootProps) {
  return <button className={`h-12 ${width} flex justify-center items-center gap-2 text-gray-100 px-8 rounded-md border-2 border-transparent transition-colors duration-500 bg-violet-500 hover:bg-violet-600 disabled:opacity-70 disabled:bg-violet-600 disabled:cursor-not-allowed  `} {...props}>{children}</button>
}
