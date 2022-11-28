import { CaretLeft, CaretRight } from 'phosphor-react'
import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import logoSvg from '../assets/logo.svg'

interface SideBarRootProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
  isOpen: boolean
  openCloseBtn: () => void
}

interface SideBarNavButton extends React.LiHTMLAttributes<HTMLLIElement> {
  title: string
  to: string
  icon?: ReactNode
  isOpen: boolean
}

const Root = function ({ children, isOpen, openCloseBtn, ...props }: SideBarRootProps) {
  return (
    <aside
      className={`transition-all duration-400 h-full ${isOpen ? 'min-w-[240px]' : 'min-w-[80px]'} bg-gray-200 dark:bg-slate-800 py-1 px-3`}
      {...props}
    >
      <header className='relative mb-4 '>
        <div className='flex items-center h-12 w-full'>
          <img src={logoSvg} className='h-8 w-14 min-w-[56px]' />
          <div className={`font-russo text-xl transition-all duration-700 ${isOpen ? '' : 'duration-75 hidden '} dark:text-gray-100`}>BOTCRYPTO</div>
        </div>
        <i className='absolute h-6 w-6 flex justify-center items-center rounded-full text-white bg-slate-700 top-[50%] translate-y-[-50%] right-[-24px] cursor-pointer hover:bg-violet-400' onClick={openCloseBtn}>
          {isOpen
            ? <CaretLeft size={20} weight={'bold'} />
            : <CaretRight size={20} weight={'bold'} />
          }
        </i>
      </header>

      <ul>
        {children}
      </ul>

    </aside>
  )
}

const NavButon = function ({ title, to, icon, isOpen, ...props }: SideBarNavButton) {
  return (
    <li className='h-12 mt-2' {...props} >
      <NavLink
        to={to}
        className='h-full w-full no-underline rounded-md text-stone-500 dark:text-gray-300 font-medium hover:text-gray-50 flex items-center transition-colors duration-300 hover:bg-violet-500 [&.active]:bg-violet-500 border-2 border-transparent outline-none focus-visible:border-violet-600 '
      >
        <i className='h-full w-14 min-w-[56px] flex justify-center items-center'>{icon}</i>
        <span className={`h-full flex items-center text-xl transition-all duration-700 ${isOpen ? '' : 'duration-75 hidden'}`}> {title}</span>
      </NavLink>
    </li>
  )
}

export const SideBar = {
  Root,
  NavButon
}
