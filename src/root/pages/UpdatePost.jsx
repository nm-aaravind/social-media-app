import { Typography } from '@mui/material';
import React from 'react'
import { IoImages } from "react-icons/io5";
import PostForm from '../../components/PostForm';
import { useOutlet, useOutletContext, useParams } from 'react-router-dom';
import { useGetPostById, useUpdatePost } from '../../lib/react-query/queries';
import Loader from "../../components/Loader"
import {Box} from '@mui/material';
import PageHeader from '../../components/PageHeader';
function UpdatePost() {
  const { id } = useParams();
  const { data: post, isPending: isFetching } = useGetPostById(id)
  const {mutateAsync: updatePost, isPending: isUpdating} = useUpdatePost()
  const [offset] = useOutletContext()
  console.log(post, "Got data")
  return (
    isFetching || isUpdating ? <Loader message={isFetching ? 'Fetching your post' : 'Updating your post'}/> : <Box className='flex flex-col w-full items-center'>
    <PageHeader offset={offset} heading="Update your post" />
  <Box className='sm:w-full lg:w-[min(80%,1200px)] mt-36'>
  <PostForm mode='update' post={post} method={updatePost}/>
  </Box>
</Box>
  )
}



export default UpdatePost