import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { multiFormatDateString } from '../lib/utils'
import UserContext from '../context/userContext'
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
function Postcard({ post }) {
    const {userDetails} = useContext(UserContext)
    return (
        <div className='bg-violet-300 border border-violet-300 w-[max(1rem,800px)] sm:h-[600px] md:h-[850px] rounded-xl overflow-hidden '>
            <div className='header w-full h-24 bg-slate-300 flex justify-between items-center'>
                <Link to={`/profile/${post.user.$id}`} className='float-left flex items-center'>
                    <img src={post.user.profileimageurl} className='w-16 rounded-full mx-9'></img>
                    <Typography variant='h4' component='p' color='purple' className=''>{post.user.name}</Typography>
                </Link>
                {userDetails.accountid===post.user.accountid && <Link to={`/update-post/${post.$id}`} className='text-3xl mx-9'>Update</Link>}
            </div>
            <div className=''>
                <img src={post.image} className='h-[655px] w-full'></img>
            </div>
            <div className='h-24 flex flex-col mx-4 text-ellipsis'>
                <div className='flex gap-4'>
                <Link><FaRegHeart /></Link>
                <Link><FaRegComment /></Link>
                </div>
                <p className='text-ellipsis overflow-hidden whitespace-nowrap'><span className='font-semibold '>{post.user.name}</span> {post.caption}</p>
                <span className=''>{multiFormatDateString(post.$createdAt)} Remove this</span>
            </div>
        </div>
    )
}

export default Postcard