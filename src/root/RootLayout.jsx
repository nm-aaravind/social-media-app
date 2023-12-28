import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Bottombar from '../components/Bottombar'
import { Box } from '@mui/material'
function RootLayout() {
  return (
    <Box bgcolor='primary.main' className="w-full md:flex md:flex-col min-h-screen">
      <Navbar />
      <section className='flex flex-1'>
        <Outlet />
      </section>
      <Bottombar />
    </Box>
  )
}

export default RootLayout