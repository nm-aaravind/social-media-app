import React from 'react'
import { Typography } from '@mui/material'
function PageHeader({ offset, heading }) {
  return (
    <div className={`h-[4.3rem] bg-[#272727] w-full drop-shadow-3xl flex justify-center items-center fixed ${offset > 50 ? 'top-[4rem]' : 'top-[7rem]'} z-20 transition-all`}>
        <Typography  marginX={'30px'} variant='h4' component='p' color='secondary'>{heading}</Typography>
      </div>
  )
}

export default PageHeader