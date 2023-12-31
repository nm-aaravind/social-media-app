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
        <Box className={`${forGrid ? 'bg-transparent' : 'bg-[#272727]'} flex flex-col text-ellipsis px-5 pt-3 ${forGrid ? 'h-[6.5rem]' :'md:h-36'} md:border-t md:border-white/90`}>
            <div className='flex gap-6 text-white sm:text-2xl md:text-3xl'>
                <button className='' onClick={toggleLike}>
                    {
                        checkIsLiked(likes, userId) ? <Favorite fontSize='inherit' color='error' className='w-8 h-7' /> :
                        <FavoriteBorder fontSize='inherit' className=''/>
                    }
                </button>
                {
                    !forGrid && <button>
                        <ChatBubbleOutlineOutlined fontSize='inherit' className='w-8 h-7'/>
                    </button>
                }
                <button className='ml-auto mr-2' onClick={toggleSave}>
                    {
                        savePending || removeSavePending ? <p className='font-varela'>Saving</p> : isSaved ? <BookmarkRemove fontSize='inherit'  color='info' className='w-8 h-7' /> :
                        <BookmarkAddOutlined fontSize='inherit'  className='w-8 h-7'/>
                    }
                </button>
            </div>
            <p className='text-white text-ellipsis text-lg font-varela overflow-hidden line-clamp-2 mt-1 whitespace-nowrap sm:text-md md:text-2xl mb-5'><span className={`${forGrid && 'pb-2'}`}>{post.user.username}</span> {!forGrid && post.caption}</p>
            {
                !forGrid && <span className='text-white sm:text-md lg:text-lg font-varela text-black/80'>{multiFormatDateString(post.$createdAt)}</span>
            }
        </Box>
    )
}

export default PostStats