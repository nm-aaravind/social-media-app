import React, { useEffect, useState } from 'react'
import { Favorite, ChatBubbleOutlineOutlined, ChatBubble, BookmarkAddOutlined, BookmarkRemove, FavoriteBorder  } from '@mui/icons-material';
import { multiFormatDateString, checkIsLiked } from '../lib/utils'
import { Box } from '@mui/material';
import { useGetUser, useLikePost, useRemoveSavedPost, useSavePost } from '../lib/react-query/queries';

function PostStats({ post, userId, forGrid }) {
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
            await savePost({ postId: post.$id, userId })
        }

    }
    return (
        <Box borderTop='2px solid #fff8' className={`${forGrid ? 'bg-transparent' : 'bg-[#272727]'} flex flex-col text-ellipsis px-5 pt-3 ${forGrid ? 'h-[5.5rem]' : 'sm:h-28 md:h-32 lg:h-36'}`}>
            <div className='flex gap-6 text-white'>
                <button className='' onClick={toggleLike}>
                    {
                        checkIsLiked(likes, userId) ? <Favorite fontSize='large' color='error' className='w-8 h-7' /> :
                        <FavoriteBorder fontSize='large' className=''/>
                    }
                </button>
                {
                    !forGrid && <button>
                        <ChatBubbleOutlineOutlined fontSize='large' className='w-8 h-7'/>
                    </button>
                }
                <button className='ml-auto mr-2' onClick={toggleSave}>
                    {
                        savePending || removeSavePending ? <p className='font-varela'>Saving</p> : isSaved ? <BookmarkRemove fontSize='large' color='info' className='w-8 h-7' /> :
                        <BookmarkAddOutlined fontSize='large' className='w-8 h-7'/>
                    }
                </button>
            </div>
            <p className='text-white text-ellipsis text-lg font-varela overflow-hidden line-clamp-2 mt-1 whitespace-nowrap sm:text-lg md:text-2xl'><span className=''>{post.user.username}</span> {!forGrid && post.caption}</p>
            {
                !forGrid && <span className='text-white sm:text-md lg:text-lg font-varela text-black/80 mt-1'>{multiFormatDateString(post.$createdAt)}</span>
            }
        </Box>
    )
}

export default PostStats