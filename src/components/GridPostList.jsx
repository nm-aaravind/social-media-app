import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'
import UserContext from '../context/userContext'

function GridPostList({ posts }) {
    const { userDetails } = useContext(UserContext)
  return (
    <ul className='flex flex-grow gap-12 justify-center flex-wrap mb-32'>
        {posts.map((item) => <li className='drop-shadow-3xl inline items-stretch xl:w-[24rem] lg:w-[20rem] md:w-[18rem] hover:scale-110 transition-all'>
            <Link className='' to={`posts/${item.$id}`}>
                <img className='h-full w-full' src={item.image}></img>
            </Link>
            <div className='w-full fixed bottom-0 justify-between'>
                <PostStats forGrid={true} post={item} userId={userDetails.accountid} />
            </div>
        </li>
    )}
    </ul>
  )
}

export default GridPostList