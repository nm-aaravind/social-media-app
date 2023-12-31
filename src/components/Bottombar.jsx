import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box } from '@mui/material';
import { AddOutlined, BookmarkOutlined, HomeOutlined, SearchOutlined } from '@mui/icons-material';
function Bottombar() {
  return (
    <Box bgcolor='primary.light' className='w-full drop-shadow-3xl-inverted h-[4.5rem] fixed bottom-0 flex justify-between sm:text-3xl md:text-5xl'>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isActive ? "text-white w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444]"
        }
      >
        <HomeOutlined fontSize='inherit' className='m-auto' />
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive, isPending }) =>
          isActive ? "text-white bottom-active w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444] transition-colors"
        }
      >
        <SearchOutlined fontSize='inherit' className='text-inherit m-auto' />
      </NavLink>
      <NavLink
        to="/create-post"
        className={({ isActive, isPending }) =>
          isActive ? "text-white bottom-active w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444]"
        }
      >
        <AddOutlined fontSize='inherit' className='text-inherit m-auto' />
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-white bottom-active w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444]"
        }
      >
        <BookmarkOutlined fontSize='inherit' className='text-inherit m-auto' />
      </NavLink>
    </Box>
  )
}

export default Bottombar