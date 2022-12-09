import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from '../hooks/usePrivateRoutes'
import { Layout } from '../layout/Layout'
import { DashboardPage } from '../pages/Dashboard/dashboard'
import { LoginPage } from '../pages/Login/login'
import { Orders } from '../pages/Orders/orders'
import { SettingsPage } from '../pages/Settings/settings'
import { SymbolsPage } from '../pages/Symbols/symbols'

export function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/symbols' element={<SymbolsPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orders/:symbol' element={<Orders />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
