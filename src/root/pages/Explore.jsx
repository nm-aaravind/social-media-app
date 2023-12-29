import { Box, Typography } from '@mui/material'
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'

function Explore() {
  const [offset] = useOutletContext()
  return (
    <Box className=''>
      <PageHeader offset={offset} heading="Explore"/>
      
    </Box>
  )
}

export default Explore