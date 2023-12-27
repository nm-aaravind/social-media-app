import React from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { FaRegComment } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { multiFormatDateString } from '../lib/utils'
function PostStats({ post }) {
  return (
    <div className='h-24 flex flex-col mx-4 text-ellipsis'>
                <div className='flex gap-4'>
                <Link><FaRegHeart /></Link>
                <Link><FaRegComment /></Link>
                </div>
                <p className='text-ellipsis overflow-hidden whitespace-nowrap'><span className='font-semibold '>{post.user.name}</span> {post.caption}</p>
                <span className=''>{multiFormatDateString(post.$createdAt)} Remove this</span>
            </div>
  )
}

export default PostStats