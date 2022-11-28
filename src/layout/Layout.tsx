import { ChartPieSlice, CurrencyCircleDollar, Gear } from 'phosphor-react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SideBar } from '../components/SideBar'
import { usePersistedState } from '../hooks/usePersistState'

export function Layout () {
  const [isOpen, setOpen] = usePersistedState('BOTCRYPTO_TOOGLE_MENU', false)
  return (
    <div className='relative h-screen w-screen flex overflow-hidden'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className={'z-50'}
      />
      <SideBar.Root isOpen={isOpen} openCloseBtn={() => setOpen(!isOpen)}>
        <SideBar.NavButon isOpen={isOpen} to='/' title='Dashboard' icon={<ChartPieSlice size={24} weight={'fill'} />} />
        <SideBar.NavButon isOpen={isOpen} to='/symbols' title='Symbols' icon={<CurrencyCircleDollar size={24} weight={'fill'} />} />
        <SideBar.NavButon isOpen={isOpen} to='/settings' title='Settings' icon={<Gear size={24} weight={'fill'} />} />
      </SideBar.Root>
      <Outlet />
    </div>
  )
}
