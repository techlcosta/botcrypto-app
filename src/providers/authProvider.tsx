import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext, LoginProps, User } from '../context/authContext'
import { usePersistedState } from '../hooks/usePersistState'
import { setDefaultsHeaders } from '../services/base.api'
import { authenticate } from '../services/user.api'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = usePersistedState<User | null>('BOTCRYPTO_USER', null)
  const [token, setToken] = usePersistedState<string | null>('BOTCRYPTO_TOKEN', null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const isAuthenticated = !!token
  const navigate = useNavigate()

  useEffect(() => {
    if (token) setDefaultsHeaders(token)
  }, [token])

  async function login ({ username, password }: LoginProps): Promise<void> {
    setLoading(true)
    try {
      const resp = await authenticate(username, password)

      if (!resp.data) throw new Error('User not found!')

      setToken(resp.data.token)

      setUser(resp.data.username)

      navigate('/')
    } catch (error) {
      console.error(error)

      setUser(null)

      setToken(null)

      throw new Error(error instanceof Error ? error.message : 'Login failed')
    }

    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        token

      }}
    >

      {isLoading ? <h1>Loading...</h1> : children}

    </AuthContext.Provider>
  )
}
