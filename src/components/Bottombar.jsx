import React from 'react'
import { NavLink } from 'react-router-dom'
import { GrHomeRounded } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";
function Bottombar() {
  return (
    <div className='w-full drop-shadow-3xl-inverted h-20 sticky bottom-0 flex justify-around z-40 border-t-4 bg-[#DBB5FF] border-purple-400 border-opacity-50'>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "bottom-active w-full flex items-center " : " w-full flex items-center hover:bg-[#ce9eff]"
        }
      >
        <GrHomeRounded className='text-[#800080]  sm:w-8 sm:h-8 lg:w-11 lg:h-10 m-auto ' />
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "bottom-active w-full flex items-center " : "w-full flex items-center hover:bg-[#ce9eff] transition-colors"
        }
      >
        <IoMdSearch className='text-[#800080] sm:w-9 sm:h-9 lg:w-12 lg:h-12 m-auto' />
      </NavLink>
      <NavLink
        to="/create-post"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "bottom-active w-full flex items-center bg-[#800080]" : "w-full flex items-center hover:bg-[#ce9eff]"
        }
      >
        <FaPlus className='text-[#800080]  sm:w-8 sm:h-8 lg:w-11 lg:h-11 m-auto' />
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "bottom-active w-full flex items-center " : "w-full flex items-center hover:bg-[#ce9eff]"
        }
      >
        <MdSaveAlt className='text-[#800080] sm:w-8 sm:h-8 lg:w-11 lg:h-11 m-auto' />
      </NavLink>
    </div>
  )
}

export default Bottombar