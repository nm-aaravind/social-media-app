import React from 'react'
import { Box } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import { useGetUser } from '../../lib/react-query/queries'
import ProfileForm from '../../components/ProfileForm'
import Loader from '../../components/Loader'
function UpdateProfile() {
  const {data: user, isPending} = useGetUser();
  return (
    <Box className='flex flex-col w-full items-center'>
    <PageHeader heading="Update Profile" />
    {isPending ? <Loader message="Loading profile" /> : <Box className='sm:w-full lg:w-[min(80%,1200px)] mt-52'>
      <ProfileForm user={user} />
    </Box>}
  </Box>
  )
}

export default UpdateProfile