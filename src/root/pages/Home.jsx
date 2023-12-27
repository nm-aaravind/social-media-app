import React from 'react'
import { useGetRecentPosts } from '../../lib/react-query/queries'
import Loader from '../../components/Loader'
import Postcard from '../../components/Postcard'

function Home() {
  const { data: posts, isPending } = useGetRecentPosts()
  return (
    isPending && !posts ? <Loader message={"Hold on while we fetch your feed"}/> :
    <div className='home-container'>
      <div className='post-container'>
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