import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import UserContext from '../context/userContext'
import { Box, AppBar, Typography } from '@mui/material'
function AuthLayout() {
    const { isAuthenticated } = useContext(UserContext)
    return (
        <Box bgcolor='primary.main'>
            <AppBar position='fixed' sx={{ backgroundColor: 'primary.light' }} className='drop-shadow-3xl w-full'>
                    <Typography padding={'1rem'} align='center' variant='h2' component='h1' color='whitesmoke' className='cursor-default'>
                        Heyo
                    </Typography>
            </AppBar>
            {isAuthenticated ? <Navigate to='/' /> :
                <Box className='flex items-center w-screen h-screen'>
                    <Outlet />
                </Box>}
        </Box>
    )
}

export default AuthLayout