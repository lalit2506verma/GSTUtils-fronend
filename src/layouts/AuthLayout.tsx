import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <>
            <Outlet />
            <ToastContainer />
        </>
    )
}

export default AuthLayout