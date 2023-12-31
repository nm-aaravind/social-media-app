import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'
import UserContext from '../context/userContext'

function GridPostList({ posts, toDisplay }) {
    const { userDetails } = useContext(UserContext)
    let postsToRender = []
    if(toDisplay == 'explore'){
        posts.pages.forEach((item) => {
            postsToRender = postsToRender.concat(item.documents)
        })
    }else if(toDisplay == 'save'){
        posts.forEach((item) => postsToRender.push(item.post))
    }
    else{
        postsToRender = posts
    }
    console.log(postsToRender)
    return (
        <ul className='flex flex-grow gap-12 justify-center flex-wrap mb-32'>
            {postsToRender.map((item) => <li className='drop-shadow-3xl inline items-stretch xl:w-[24rem] lg:w-[20rem] md:w-[18rem] sm:w-[12rem] hover:scale-110 transition-all'>
                <Link className='' to={`/posts/${item.$id}`}>
                    <img className='h-full w-full' src={item.image}></img>
                </Link>
                <div className='w-full fixed bottom-0 justify-between'>
                    {toDisplay !== 'save' && <PostStats forGrid={true} post={item} userId={userDetails.accountid} />}
                </div>
            </li>
            )}
        </ul>
    )
}

export default GridPostList