import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Bottombar from '../components/Bottombar'
import { Box } from '@mui/material'
function RootLayout() {
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);
  return (
    <Box bgcolor='primary.main' className="w-full md:flex md:flex-col min-h-screen">
      <Navbar offset={offset} />
      <section className='flex flex-1'>
        <Outlet context={[offset]} />
      </section>
      <Bottombar />
    </Box>
  )
}

export default RootLayout