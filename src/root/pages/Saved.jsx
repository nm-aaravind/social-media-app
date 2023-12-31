import React from 'react'
import { useGetUser } from '../../lib/react-query/queries'
import { Box } from '@mui/material'
import GridPostList from '../../components/GridPostList'
import PageHeader from '../../components/PageHeader'
function Saved() {
  const { data: user, isPending } = useGetUser() 
  console.log(user, "Dei")
  return (
    !isPending && <Box className='w-full flex justify-center mt-40'>
      <PageHeader heading="Saved"/>
      <div className='lg:w-[80%] sm:w-full sm:p-10 bg-[#272727]'>
      <GridPostList posts={user.save} toDisplay='save' />
      </div>
    </Box>
  )
}

export default Saved