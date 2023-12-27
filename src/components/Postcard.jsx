import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useGetUser } from '../lib/react-query/queries'
import PostStats from './PostStats'
function Postcard({ post, saves }) {
    const { data: user} = useGetUser();
    console.log(user, post.user.accountid)
    return (
        <div className='bg-violet-300 border border-violet-300 w-[max(1rem,800px)] sm:h-[600px] md:h-[850px] rounded-xl overflow-hidden '>
            <div className='header w-full h-24 bg-slate-300 flex justify-between items-center'>
                <Link to={`/profile/${user?.$id}`} className='float-left flex items-center'>
                    <img src={user?.profileimageurl} className='w-16 rounded-full mx-9'></img>
                    <Typography variant='h4' component='p' color='purple' className=''>{user?.username}</Typography>
                </Link>
                {user?.accountid===post.user.accountid && <Link to={`/update-post/${post.$id}`} className='text-3xl mx-9'>Update</Link>}
            </div>
            <div className=''>
                <img src={post.image} className='h-[655px] w-full'></img>
            </div>
            <PostStats post={post} userId={user?.$id} saves={saves}/>
        </div>
    )
}

export default Postcard