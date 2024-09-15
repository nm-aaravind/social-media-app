import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box } from '@mui/material';
import { AddOutlined, BookmarkOutlined, HomeOutlined, SearchOutlined } from '@mui/icons-material';
function Bottombar() {
  return (
    <Box bgcolor='primary.light' className='md:hidden  w-full fixed bottom-0 z-50 flex justify-between sm:text-3xl md:text-5xl'>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-primary p-3 bottom-active w-full flex items-center bg-primary-light" : "text-white p-3 w-full bg-primary flex items-center hover:bg-primary-light transition-colors hover:text-primary"
        }
      >
        <HomeOutlined fontSize='medium' className='m-auto' />
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive, isPending }) =>
          isActive ? "text-primary p-3 bottom-active w-full flex items-center bg-primary-light" : "text-white w-full bg-primary flex items-center hover:bg-primary-light transition-colors hover:text-primary"
        }
      >
        <SearchOutlined fontSize='medium' className='text-inherit m-auto' />
      </NavLink>
      <NavLink
        to="/create-post"
        className={({ isActive, isPending }) =>
          isActive ? "text-primary p-3 bottom-active w-full flex items-center bg-primary-light" : "text-white w-full bg-primary flex items-center hover:bg-primary-light transition-colors hover:text-primary"
        }
      >
        <AddOutlined fontSize='medium' className='text-inherit m-auto' />
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) =>
          isActive ? "text-primary p-3 bottom-active w-full flex items-center bg-primary-light" : "text-white w-full bg-primary flex items-center hover:bg-primary-light transition-colors hover:text-primary"
        }
      >
        <BookmarkOutlined fontSize='medium' className='text-inherit m-auto' />
      </NavLink>
    </Box>
  )
}

export default Bottombar