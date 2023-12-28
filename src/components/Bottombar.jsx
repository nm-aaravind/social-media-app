import React from 'react'
import { NavLink } from 'react-router-dom'
import { GrHomeRounded } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { RiBookmark3Line } from "react-icons/ri";
import { Box, Stack } from '@mui/material';
function Bottombar() {
  return (
    <Box bgcolor='primary.light' className='w-full drop-shadow-3xl-inverted h-20 fixed bottom-0 flex justify-between'>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isActive ? "text-white w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444]"
        }
      >
        <GrHomeRounded className='text-inherit sm:w-8 sm:h-8 lg:w-11 lg:h-10 m-auto ' />
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive, isPending }) =>
          isActive ? "text-white bottom-active w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444] transition-colors"
        }
      >
        <IoMdSearch className='text-inherit sm:w-9 sm:h-9 lg:w-12 lg:h-12 m-auto' />
      </NavLink>
      <NavLink
        to="/create-post"
        className={({ isActive, isPending }) =>
          isActive ? "text-white bottom-active w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444]"
        }
      >
        <FaPlus className='text-inherit  sm:w-8 sm:h-8 lg:w-11 lg:h-11 m-auto' />
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-white bottom-active w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444]"
        }
      >
        <RiBookmark3Line className='text-inherit sm:w-8 sm:h-8 lg:w-11 lg:h-11 m-auto' />
      </NavLink>
    </Box>
  )
}

export default Bottombar