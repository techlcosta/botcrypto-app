import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/authProvider'
import { AppRoutes } from './routes/routes'

export function App () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
