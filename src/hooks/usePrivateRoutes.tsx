import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

interface PrivateRouteProps {
  children: JSX.Element
}

export function PrivateRoute ({ children, ...rest }: PrivateRouteProps) {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />
  }

  return children
}
