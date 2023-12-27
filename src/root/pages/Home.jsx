import React, { useContext } from 'react'
import { useGetRecentPosts } from '../../lib/react-query/queries'
import Loader from '../../components/Loader'
import Postcard from '../../components/Postcard'
import { useGetSaves } from '../../lib/react-query/queries'
import UserContext from '../../context/userContext'
function Home() {
  const { data: posts, isPending } = useGetRecentPosts()
  return (
    isPending && !posts ? <Loader message={"Hold on while we fetch your feed"}/> :
    <div className='home-container flex justify-center'>
      <div className='post-container w-4/6'>
        <ul>
          {
            posts.documents.map((post) => <Postcard post={post} />)
          }
        </ul>
      </div>
    </div>
  )
}

export default Home