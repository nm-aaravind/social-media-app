import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import UserContext from '../context/userContext'
function AuthLayout() {
    const { isAuthenticated } = useContext(UserContext)
    return (
        isAuthenticated ? <Navigate to='/' /> :
            <div className='flex items-center w-screen h-screen bg-slate-100'>
                <Outlet />
            </div>
    )
}

export default AuthLayout