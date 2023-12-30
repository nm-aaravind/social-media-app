import React from 'react'
import { Typography } from '@mui/material'
function PageHeader({ heading }) {
  return (
    <div className={`h-[4.5rem] bg-[#272727] w-full drop-shadow-3xl flex justify-center items-center fixed top-[5.7rem] z-20 transition-all`}>
        <Typography  marginX={'30px'} variant='h4' component='p' color='secondary'>{heading}</Typography>
      </div>
  )
}

export default PageHeader