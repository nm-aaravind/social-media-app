import React from 'react'
import { Typography } from '@mui/material'
function PageHeader({ heading }) {
  return (
    <div className={`md:h-[5.5rem] sm:h-[4rem] bg-[#272727] w-full drop-shadow-3xl flex justify-center items-center fixed md:top-[5.7rem] sm:top-[5rem] z-20 transition-all`}>
        <Typography fontFamily='Varela Round'  marginX={'30px'} variant='p' component='p' color='secondary' className='sm:text-2xl md:text-4xl'>{heading}</Typography>
      </div>
  )
}

export default PageHeader