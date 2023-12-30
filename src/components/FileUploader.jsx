import React, { useCallback, useState, memo, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaPhotoVideo } from "react-icons/fa";
import { Paper, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { useFormContext } from 'react-hook-form';

function FileUploader({ name, mode, image, forProfile = false }) {
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
                        mode == 'update' && file?.length == 0 ? <div className='m-auto sm:h-56 md:h-96'>
                            <img src={image} className='sm:h-56 md:h-96 aspect-square'></img>
                        </div> 
                        : 
                        file?.length ? <div className='m-auto sm:h-56 md:h-96'>
                        <img src={URL.createObjectURL(file[0])} className= 'sm:h-56 md:h-96 aspect-square'></img>
                        </div> 
                        : 
                        <div className=''>
                            <FaPhotoVideo className='m-auto w-24 h-24 mb-4' />
                            {
                                isDragActive ?
                                <p>Drop images here</p> :
                                <p>Drag and drop, or click to select image</p>
                            }
                        </div>
                    }
                    {
                        file?.length > 0 && <p className='w-full text-center p-4'>{!forProfile ? 'Click here to choose another picture' : 'Click here to change profile photo'}</p>
                    }
                </div>
            </Paper>    
        </div>
    )
}

export default FileUploader