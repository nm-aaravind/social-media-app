import React, { useCallback, useState, memo, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaPhotoVideo } from "react-icons/fa";
import { Paper, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function FileUploader({ name, mode, image }) {
    const {
        register,
        unregister,
        setValue,
        watch,
    } = useFormContext()
    const file = watch(name)
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            setValue(name, acceptedFiles)
        }
    }, [setValue, name])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/png': ['.png', '.jpg', '.jpeg'],
        }
    })
    useEffect(() => {
        return () => URL.revokeObjectURL(file)
    }, []);

    useEffect(() => {
        register(name, {
            required: {
                value: mode == 'create'? true : false,
                message: "Image required"
            }
        })
        return () => {
            unregister(name)
        }
    }, [register, unregister, name])

    return (
        <div className='p-4 drop-shadow-form'>
            <Paper square elevation={1} sx={{
                backgroundColor: 'primary.light', border: '1px solid #ebe8e844'
            }}>
                <div {...getRootProps({
                    className: 'p-7 text-white/75 w-full border border-black font-varela px-3 cursor-pointer grid place-content-center text-2xl border-none'
                })}>
                    <input {...getInputProps({
                        className: 'border border-red-100 bg-black'
                    })} id='images'/>
                    {
                        mode == 'update' && file?.length == 0 ? <div className='h-full w-full bg-black'>
                            <img src={image} className='w-full'></img>
                        </div> 
                        : 
                        file?.length ? <div className='w-full h-full'>
                        <img src={URL.createObjectURL(file[0])} className='w-full aspect-square'></img>
                        </div> 
                        : 
                        <div className=''>
                            <FaPhotoVideo className='m-auto w-24 h-24 mb-4' />
                            {
                                isDragActive ?
                                <p>Drop images here</p> :
                                <p>Drag and drop, or click to select images</p>
                            }
                        </div>
                    }
                    {
                        file?.length > 0 && <p className='w-full text-center p-4'>Click on the picture to choose another picture</p>
                    }
                </div>
            </Paper>    
        </div>
    )
}

export default FileUploader