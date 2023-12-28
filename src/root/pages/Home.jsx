import React from 'react'
import { useGetRecentPosts } from '../../lib/react-query/queries'
import Loader from '../../components/Loader'
import Postcard from '../../components/Postcard'
import { useGetUser } from '../../lib/react-query/queries'
import { Box } from '@mui/material'
function Home() {
  const { data: posts, isPending } = useGetRecentPosts()
  const { data: user } = useGetUser();
  return (
    <Box color='primary' className='home-container flex justify-center w-full mb-32 mt-16 '>
      {
        isPending || !posts ? <Loader message={"Hold on while we fetch your feed"}/> : <div className='post-container'>
        <ul className='flex flex-col w-full gap-14 '>
          {
            posts.map((post) => <Postcard post={post} user={user} />)
          }
        </ul>
      </div>}
    </Box>
  )
}

export default Home