import React, {useMemo} from 'react'
import { TextField, Typography, Paper, Button } from '@mui/material'
import FileUploader from './FileUploader'
import { useForm } from 'react-hook-form'
import { useCreatePost } from '../lib/react-query/queries'
function PostForm({ post }) {
    const {mutateAsync: createPost, isPending: isLoading} = useCreatePost()
    const { register, handleSubmit  } = useForm({
        defaultValues:{
            caption: post ? post?.caption : '',
            location: post ? post?.location : '',
            tags: post ? post?.tags.join() : '',
            file: []
        }
    })

    function formSubmit(data){
        console.log(data)
    }
    return (
        <section>
            <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-3 m-4'>
                    <Typography variant='h4' component={'p'} color='purple'>Caption</Typography>
                    <Paper sx={{ backgroundColor: '#F1F5F9' }}>
                        <TextField {...register('caption')} name='caption' id="caption" rows={4} variant="outlined" color='secondary' fullWidth inputProps={{ style: { fontSize: 22 } }} multiline />
                    </Paper>
                </div>
                <FileUploader />
                <div className='flex flex-col gap-3 m-4'>
                    <Typography variant='h4' component={'p'} color='purple'>Location</Typography>
                    <Paper sx={{ backgroundColor: '#F1F5F9' }}>
                        <TextField {...register('location')} name='location' id="location" variant="outlined" fullWidth inputProps={{ style: { fontSize: 22} }} maxRows={4} multiline />
                    </Paper>
                </div>
                <div className='flex flex-col gap-3 m-4'>
                    <Typography  variant='h4' component={'p'} color='purple'>Tags</Typography>
                    <Paper sx={{ backgroundColor: '#F1F5F9' }}>
                        <TextField rows={2} {...register('tags')} name='tags' id="tags" variant="outlined" color='secondary' fullWidth inputProps={{ style: { fontSize: 22 } }} multiline />
                    </Paper>
                </div>
                <div className='self-end flex gap-8 p-4 mt-2 mb-6'>
                    <Button variant="outlined" sx={{ fontSize: '1.5rem' ,borderColor: 'red', color: 'red', width: '9rem', height: '4rem', ":hover":{ backgroundColor: 'red', border: 'red', color:'white' } }}>Discard</Button>
                    <Button type='submit' variant="contained" sx={{ fontSize: '1.5rem',backgroundColor: '#800080', height:'4rem', width: '9rem' }} color='secondary'>Post</Button>
                </div>
            </form>
        </section>
    )
}

export default PostForm