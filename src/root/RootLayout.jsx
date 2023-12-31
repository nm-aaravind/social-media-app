import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Bottombar from '../components/Bottombar'
import { Box } from '@mui/material'
function RootLayout() {
  // const [offset, setOffset] = React.useState(0);
  // React.useEffect(() => {
  //   window.onscroll = () => {
  //     if(window.scrollY > 0 && window.scrollY < 500){
  //       setOffset(window.scrollY);
  //     }
  //   };
  // }, []);
  return (
    <Box bgcolor='primary.main' className=" md:flex md:flex-col min-h-screen">
      <Navbar />
      <section className='flex flex-1'>
        <Outlet />
      </section>
      <Bottombar />
    </Box>
  )
}

export default RootLayout