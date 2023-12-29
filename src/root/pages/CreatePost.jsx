import { Typography } from '@mui/material';
import React from 'react'
import { IoImages } from "react-icons/io5";
import PostForm from '../../components/PostForm';
import { useCreatePost } from '../../lib/react-query/queries';
import Loader from '../../components/Loader';
import {Box} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
function CreatePost() {
  const {mutateAsync: createPost, isPending: isCreating } = useCreatePost()
  const [offset] = useOutletContext()
  return (
    isCreating ? <Loader message='Creating your post' /> : <Box className='flex flex-col w-full items-center'>
    <PageHeader offset={offset} heading="Post something" />
    <Box className='sm:w-full lg:w-[min(80%,1200px)] mt-52'>
      <PostForm mode='create' method={createPost}/>
    </Box>
  </Box>
  )
}

export default CreatePost