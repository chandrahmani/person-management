// import { ReactNode, useEffect, useState } from "react"

// export const AuthContext = ({ children }: { children: ReactNode }) => {
//      const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  
//   const handleSetToken = (newToken: string | null) => {
//     if (newToken) {
//       localStorage.setItem('token', newToken)
//     } else {
//       localStorage.removeItem('token')
//     }
//     setToken(newToken)
//   }

//   const login = (newToken: string) => {
//     localStorage.setItem('token', newToken)
//     setToken(newToken)
//   }


//   const logout = () => {
//     localStorage.removeItem('token')
//     setToken(null)
//   }

//   useEffect(() => {
//     handleSetToken(token)
//   }, [token] )
// }