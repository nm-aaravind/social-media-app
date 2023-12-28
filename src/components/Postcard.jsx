import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useGetUser } from '../lib/react-query/queries'
import PostStats from './PostStats'
import {Box} from '@mui/material'
function Postcard({ post, saves, user }) {
    return (
        <Box bgcolor='primary.light' border='1px solid #fff2' className=' w-full lg:w-[45rem] lg:h-[52rem] md:w-[40rem] md:h-[47rem] sm:h-[38rem] sm:w-[35rem] overflow-hidden drop-shadow-form'>
            <Box borderBottom='1px solid #fff2' className='header w-full sm:h-20 md:h-24 lg:h-28 flex justify-between items-center'>
                <Link to={`/profile/${user?.$id}`} className='float-left flex items-center'>
                    <img src={user?.profileimageurl} className='sm:w-14 md:w-16 lg:w-[4.5rem] rounded-full mx-9'></img>
                    <p className='sm:text-2xl lg:text-3xl font-varela text-purple-500 -ml-3'>{user?.username}</p>
                </Link>
                {user?.accountid===post?.user.accountid && <Link to={`/update-post/${post.$id}`} className='mx-9 sm:text-2xl lg:text-3xl font-varela text-purple-500'>Update</Link>}
            </Box>
            <div className='w-full overflow-hidden object-fill sm:h-[26rem] md:h-[33rem] lg:h-[36rem] bg-slate-600'>
                <img src={post.image} className='h-full w-full'></img>
            </div>
            <PostStats post={post} userId={user?.$id} saves={saves}/>
        </Box>
    )
}

export default Postcard