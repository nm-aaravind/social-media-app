import { Typography } from '@mui/material';
import React from 'react'
import { IoImages } from "react-icons/io5";
import PostForm from '../../components/PostForm';

function CreatePost() {
  return (
    <div className='flex flex-1 w-full justify-center'>
      <div className='sm:w-full lg:w-[80%] pt-5 px-14'>
        <div className='flex justify-center items-center p-3 py-5'>
          <IoImages className=' text-[#800080] w-20 h-20'/>
          <Typography  marginX={'30px'} variant='h2' component='p' color='purple'>Post something</Typography>
        </div>
        <PostForm />
      </div>
    </div>
  )
}

export default CreatePost