import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = localStorage.getItem("authToken")

    // checking token is present or not
    if(!token){
        return <Navigate to="/auth/login" replace />
    }
    
  return <Outlet />
}

export default ProtectedRoute