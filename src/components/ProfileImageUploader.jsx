import React, { useCallback, useState, memo, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { avatars } from '../lib/appwrite/config';

function ProfileImageUploader({ name, mode, image, setImage, user_name }) {
    const {
        register,
        unregister,
        setValue,
        watch,
    } = useFormContext()
    const file = watch(name)
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        if (acceptedFiles?.length) {
            setValue(name, acceptedFiles)
            setImage(URL.createObjectURL(acceptedFiles[0]))
        }
    }, [setValue, name])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop, accept: {
            'image/png': ['.png', '.jpg', '.jpeg'],
        }
    })

    useEffect(() => {
        register(name, {
            required: {
                value: mode == 'create' ? true : false,
                message: "Image required"
            }
        })
        return () => {
            unregister(name)
            URL.revokeObjectURL(file)
        }
    }, [register, unregister, name])

    return (
        <Box className="p-1">
            <div className='w-full'>
                <img className='m-auto w-80 h-80 object-fill ' src={image} />
            </div>
            <div className='pt-9 pb-3 text-white/75 w-full flex font-varela px-3 cursor-pointer text-2xl gap-10'>
                <Button variant="outlined" sx={{ height: '4rem', width: '100%', border: '1px solid #ebe8e888', fontSize: '22px', borderRadius: 0, boxShadow: '0px 5px 5px rgba(0,0,0,0.5)', color: '#ebe8e888', ":hover": { backgroundColor: 'red', border: 'red', color: '#ebe8e8' } }} className='drop-shadow-form-field' disabled={image === ''} onClick={() => {
                    setImage(avatars.getInitials(user_name))
                    setValue(name, [])
                }}>Remove picture</Button>
                <div {...getRootProps({
                    className: 'w-full'
                })}>
                    <input {...getInputProps()} id='file' />

                    <Button sx={{ height: '4rem', width: '100%', border: '1px solid #ebe8e888', fontSize: '22px', borderRadius: 0, boxShadow: '0px 5px 5px rgba(0,0,0,0.5)', color: '#ebe8e888', ":hover": { backgroundColor: 'green', border: 'green', color: '#ebe8e8' } }} className='drop-shadow-form-field' color='secondary'>Upload picture</Button>
                </div>
            </div>
        </Box>
    )
}

export default ProfileImageUploader