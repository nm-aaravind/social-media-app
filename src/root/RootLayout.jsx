import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Bottombar from '../components/Bottombar'
function RootLayout() {
  return (
    <div className="w-full md:flex md:flex-col bg-slate-100">
      <Navbar />
      <section className='flex flex-1'>
        <Outlet />
      </section>
      <Bottombar />
    </div>
  )
}

export default RootLayout