import { createContext } from 'react'

export interface User {
  username: string
}

export interface LoginProps {
  username: string
  password: string
}

interface AuthContextProps {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: ({ username, password }: LoginProps) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)
