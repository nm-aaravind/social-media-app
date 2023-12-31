import React from 'react'
import { Typography } from '@mui/material'
function PageHeader({ heading }) {
  return (
    <div className={`md:h-[4.5rem] sm:h-[3.5rem] bg-[#272727] w-full drop-shadow-3xl flex justify-center items-center fixed top-[5.7rem] z-20 transition-all`}>
        <Typography fontFamily='Varela Round'  marginX={'30px'} variant='p' component='p' color='secondary' className='sm:text-3xl md:text-5xl'>{heading}</Typography>
      </div>
  )
}

export default PageHeader