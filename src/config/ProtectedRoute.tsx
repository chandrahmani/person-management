import { useAuth } from "@/store/AuthProvider"
import { Navigate, Outlet } from "react-router"


export const ProtectedRoute = () => {
    const { token } = useAuth()
    return token ? <Outlet /> : <Navigate to='/login' replace />
}

