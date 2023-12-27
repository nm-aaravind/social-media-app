import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { multiFormatDateString, checkIsLiked } from '../lib/utils'
import { RiBookmark3Line, RiBookmark3Fill } from "react-icons/ri";
import { useGetUser, useLikePost, useRemoveSavedPost, useSavePost } from '../lib/react-query/queries';

function PostStats({ post, userId }) {
    const likesList = post.likes.map((user) => user.$id);
    const { mutateAsync: likePost } = useLikePost()
    const { mutateAsync: savePost, isPending: savePending } = useSavePost();
    const { mutate: removeSave, isPending: removeSavePending } = useRemoveSavedPost()
    const { data:user } = useGetUser();
    const saveState = user?.save.find((element) => element.post.$id === post.$id)
    const [likes, setLikes] = useState(likesList)
    const [isSaved, setIsSaved] = useState(false)
    async function toggleLike(event) {
        event.stopPropagation();

        let newLikes = [...likes]
        if(newLikes.includes(userId)){
            newLikes = newLikes.filter((user) => user !== userId
            )
        }
        else{
            newLikes.push(userId)
        }
        setLikes(newLikes)
        likePost({postId:post.$id, likeArray: newLikes})
    }


    useEffect(()=>{
        setIsSaved(saveState ? true:false)
    },[user])


    async function toggleSave(event){
        event.stopPropagation();
        if(isSaved){
            removeSave(saveState.$id)
            setIsSaved(false)
        }
        else{
            setIsSaved(true)
            const savedPost = await savePost({ postId: post.$id, userId })
        }

    }
    return (
        <div className='h-24 flex flex-col mx-4 text-ellipsis'>
            <div className='flex gap-4'>
                <button className='' onClick={toggleLike}>
                    {
                        checkIsLiked(likes, userId) ? <FaHeart className='text-red-600' /> :
                        <FaRegHeart />
                    }
                </button>
                <Link><FaRegComment /></Link>
                <button className='' onClick={toggleSave}>
                    {
                        savePending || removeSavePending ? <p>Saving</p> : isSaved ? <RiBookmark3Fill className='text-red-600' /> :
                        <RiBookmark3Line />
                    }
                </button>
            </div>
            <p className='text-ellipsis overflow-hidden whitespace-nowrap'><span className='font-semibold '>{post.user.name}</span> {post.caption}</p>
            <span className=''>{multiFormatDateString(post.$createdAt)}</span>
        </div>
    )
}

export default PostStats