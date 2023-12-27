import React, {useContext, useMemo} from 'react'
import { TextField, Typography, Paper, Button } from '@mui/material'
import FileUploader from './FileUploader'
import { FormProvider, useForm } from 'react-hook-form'
import { useCreatePost } from '../lib/react-query/queries'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext'
function PostForm({ post }) {
    const {mutateAsync: createPost, isPending: isLoading } = useCreatePost()
    const { userDetails } = useContext(UserContext)
    const navigate = useNavigate()
    const methods = useForm({
        defaultValues:{
            caption: post ? post?.caption : '',
            location: post ? post?.location : '',
            tags: post ? post?.tags.join() : '',
            file: []
        }
    })

    async function formSubmit(data){
        const createdPost = await createPost({...data, ...userDetails})
        if(!createdPost){
            throw Error
        }
        navigate('/')
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(formSubmit)} className='flex flex-col gap-5'>
                <div className='flex flex-col gap-3 m-4'>
                    <Typography variant='h4' component={'p'} color='purple'>Caption</Typography>
                    <Paper sx={{ backgroundColor: '#F1F5F9' }}>
                        <TextField {...methods.register('caption', {
                            max: {
                                value: 2200,
                                message: "Max 2200 characters allowed"
                            }
                        })} name='caption' id="caption" rows={4} variant="outlined" color='secondary' fullWidth inputProps={{ style: { fontSize: 22 } }} multiline />
                    </Paper>
                </div>
                <FileUploader name='images' />
                <div className='flex flex-col gap-3 m-4'>
                    <Typography variant='h4' component={'p'} color='purple'>Location</Typography>
                    <Paper sx={{ backgroundColor: '#F1F5F9' }}>
                        <TextField {...methods.register('location', {
                            max: {
                                value: 2200,
                                message: "Max 2200 characters allowed"
                            }
                        })} name='location' id="location" variant="outlined" fullWidth inputProps={{ style: { fontSize: 22} }} maxRows={4} multiline />
                    </Paper>
                </div>
                <div className='flex flex-col gap-3 m-4'>
                    <Typography  variant='h4' component={'p'} color='purple'>Tags</Typography>
                    <Paper sx={{ backgroundColor: '#F1F5F9' }}>
                        <TextField rows={2} {...methods.register('tags', {
                            max: {
                                value: 2200,
                                message: "Max 2200 characters allowed"
                            }
                        })} name='tags' id="tags" variant="outlined" color='secondary' fullWidth inputProps={{ style: { fontSize: 22 } }} multiline />
                    </Paper>
                </div>
                <div className='self-end flex gap-8 p-4 mt-2 mb-6'>
                    <Button variant="outlined" sx={{ fontSize: '1.5rem' ,borderColor: 'red', color: 'red', width: '9rem', height: '4rem', ":hover":{ backgroundColor: 'red', border: 'red', color:'white' } }}>Discard</Button>
                    <Button type='submit' variant="contained" sx={{ fontSize: '1.5rem',backgroundColor: '#800080', height:'4rem', width: '9rem' }} color='secondary'>Post</Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default PostForm