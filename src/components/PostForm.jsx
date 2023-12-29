import React, { useContext } from 'react'
import { TextField, Typography, Paper, Button } from '@mui/material'
import FileUploader from './FileUploader'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext'

function PostForm({ post, mode, method }) {
    const { userDetails } = useContext(UserContext)
    const navigate = useNavigate()
    const methods = useForm({
        defaultValues: {
            caption: post ? post?.caption : '',
            location: post ? post?.location : '',
            tags: post ? post?.tags.map((element) => '#' + element).join(', ') : '',
            file: []
        }
    })

    async function formSubmit(data) {
        try {
            if (mode == 'create') {
                console.log("Create")
                const createdPost = await method({ ...data, user: userDetails })
                if (!createdPost) {
                    throw Error
                }
                navigate('/')
            }
            else if(mode == 'update'){
                console.log(data)
                const updatePost = await method({ ...data, postId: post.$id, imageId: post.imageId })
                console.log(updatePost, "Finally out")
                if(!updatePost){
                    throw Error("Cannot update post")
                }
                return navigate(`/update-post/${post.$id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(formSubmit)} className='flex flex-col gap-5 mb-16'>
                <div className='flex flex-col gap-3 m-4'>
                    <Paper className='drop-shadow-form' square sx={{ backgroundColor: 'primary.light', ":focus-within": {
                        border: '1px solid #ebe8e888'
                    } , border: '1px solid #fff2' }}>
                        <Typography borderBottom={'1px solid #fff2'} padding={'0.75rem'} align='center' variant='h4' component={'p'} color='secondary.main'>Caption</Typography>
                        <TextField sx={{border: 0, outline: 0}} className='focus:bg-white focus-within:border-transparent focus-within:outline-none' {...methods.register('caption', {
                            max: {
                                value: 2200,
                                message: "Max 2200 characters allowed"
                            }
                        })} name='caption' id="caption" rows={4} variant="outlined" fullWidth InputProps={{ sx: { fontSize: 22, borderRadius: 0, color:'white' } }} multiline />
                    </Paper>
                </div>
                <FileUploader name='file' mode={mode} image={mode == 'create' ? false : post.image} />
                <div className='flex flex-col gap-3 m-4'>
                    <Paper className='drop-shadow-form' square sx={{ backgroundColor: 'primary.light', ":focus-within": {
                        border: '1px solid #ebe8e888'
                    } , border: '1px solid #fff2' }}>
                    <Typography borderBottom={'1px solid #fff2'} padding={'0.75rem'} align='center' variant='h4' component={'p'} color='secondary.main'>Location</Typography>
                        <TextField {...methods.register('location', {
                            max: {
                                value: 2200,
                                message: "Max 2200 characters allowed"
                            }
                        })} name='location' id="location" variant="outlined" fullWidth InputProps={{ sx: { fontSize: 22, borderRadius: 0, color:'white' } }} rows={2} multiline />
                    </Paper>
                </div>
                <div className='flex flex-col gap-3 m-4'>
                    <Paper className='drop-shadow-form' square sx={{ backgroundColor: 'primary.light', ":focus-within": {
                        border: '1px solid #ebe8e888'
                    } , border: '1px solid #fff2' }}>
                        <Typography borderBottom={'1px solid #fff2'} padding={'0.75rem'} align='center' variant='h4' component={'p'} color='secondary.main'>Tags</Typography>
                        <TextField rows={2} {...methods.register('tags', {
                            max: {
                                value: 2200,
                                message: "Max 2200 characters allowed"
                            }
                        })} name='tags' id="tags" variant="outlined" fullWidth InputProps={{ sx: { fontSize: 22, borderRadius: 0, color:'white' } }} multiline />
                    </Paper>
                </div>
                <div className='w-full flex gap-10 self-end p-4 mt-2 mb-14'>

                    <Button variant="outlined" sx={{ height:'4rem' , width:'100%' ,border: '1px solid #ebe8e888' ,fontSize: '22px', borderRadius: 0, boxShadow: '0px 5px 5px rgba(0,0,0,0.5)' , color: '#ebe8e888' , ":hover": { backgroundColor: 'red', border: 'red', color: '#ebe8e8' } }} className='drop-shadow-form-field' onClick={() => navigate(-1)}>Discard</Button>


                    <Button type='submit' sx={{ height:'4rem' , width:'100%' ,border: '1px solid #ebe8e888' ,fontSize: '22px', borderRadius: 0, boxShadow: '0px 5px 5px rgba(0,0,0,0.5)' , color: '#ebe8e888' , ":hover": { backgroundColor: 'green', border: 'green', color: '#ebe8e8' } }} className='drop-shadow-form-field' color='secondary'>{mode == 'create' ? 'Post' : 'Update'}</Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default PostForm