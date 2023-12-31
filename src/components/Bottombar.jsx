import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box } from '@mui/material';
import { AddOutlined, BookmarkOutlined, HomeOutlined, SearchOutlined } from '@mui/icons-material';
function Bottombar() {
  return (
    <Box bgcolor='primary.light' className='w-full drop-shadow-3xl-inverted md:h-[4.5rem] sm:h-[4rem] fixed bottom-0 flex justify-between'>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isActive ? "text-white w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444]"
        }
      >
        <HomeOutlined fontSize='large' className='text-inherit m-auto' />
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive, isPending }) =>
          isActive ? "text-white bottom-active w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444] transition-colors"
        }
      >
        <SearchOutlined fontSize='large' className='text-inherit m-auto' />
      </NavLink>
      <NavLink
        to="/create-post"
        className={({ isActive, isPending }) =>
          isActive ? "text-white bottom-active w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444]"
        }
      >
        <AddOutlined fontSize='large' className='text-inherit m-auto' />
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-white bottom-active w-full flex items-center bg-[#444]" : "text-[#ebe8e877] w-full flex items-center hover:bg-[#444]"
        }
      >
        <BookmarkOutlined fontSize='large' className='text-inherit m-auto' />
      </NavLink>
    </Box>
  )
}

export default Bottombar