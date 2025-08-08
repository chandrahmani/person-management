import {  useState, ReactNode, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router'

// Helper function to check if JWT token is expired
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

interface AuthContextType {
  token: string | null,
  login: (token: string) => void,
  logout: () => void,
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
 const navigate = useNavigate()

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
      navigate('/login') 
    }
    setToken(newToken)
  }

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  useEffect(() => {
      if (!token ) {
        return
    } else if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      setToken(null );
      navigate("/login");
    }
  },[token , navigate]);

  return (
    <AuthContext.Provider value={{ token, login, logout ,setToken: handleSetToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
