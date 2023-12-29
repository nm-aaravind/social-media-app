import React from 'react'
import { useGetRecentPosts } from '../../lib/react-query/queries'
import Loader from '../../components/Loader'
import Postcard from '../../components/Postcard'
import { useGetUser } from '../../lib/react-query/queries'
import { Box } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
function Home() {
  const { data: posts, isPending } = useGetRecentPosts()
  const { data: user } = useGetUser();
  const [offset] = useOutletContext()
  return (
    <Box color='primary' className='w-full home-container flex mb-32 mt-16 '>
      <PageHeader offset={offset} heading="Home" />
      {
        isPending || !posts ? <Loader message={"Hold on while we fetch your feed"}/> : <div className='post-container m-auto'>
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