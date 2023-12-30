import React from 'react'
import ProfileCard from '../../components/ProfileCard'
import { Box } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import Loader from '../../components/Loader'
import { useParams } from 'react-router-dom'
import { useGetUser } from '../../lib/react-query/queries'
const Profile = () => {
  const { id } = useParams()
  const {data: user, isPending} = useGetUser(id);
  return (
    <Box className="w-full flex justify-center">
      <PageHeader heading="Profile" />
      {
        isPending ? <Loader /> : <div className=' sm:w-full xl:w-[85%] sm:px-10 md:px-14 flex flex-col pt-48'>
          <ProfileCard user={user}/>
        <div></div>
        </div>
      }
    </Box>
  )
}

export default Profile