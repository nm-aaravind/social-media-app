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
                value: true,
                message: "Image required"
            }
        })
        return () => {
            unregister(name)
        }
    }, [register, unregister, name])

    return (
        <div className='p-4'>
            <Paper elevation={1} sx={{
                backgroundColor: '#F1F5F9', borderColor: 'darkgray', borderWidth: '0.5px', ":hover": {
                    borderColor: 'black'
                },
            }}>
                <div {...getRootProps({
                    className: 'text-[#800080] w-full border border-black font-varela px-3 cursor-pointer grid place-content-center text-2xl'
                })}>
                    <input {...getInputProps({
                        className: 'border border-red-100 bg-black'
                    })} id='images'/>
                    {
                        mode == 'update' ? <div className='h-full w-full bg-black'>
                            <img src={image} className='w-full'></img>
                        </div> 
                        : 
                        file?.length ? <div className='w-full h-full'>
                        <img src={URL.createObjectURL(file[0])} className='w-full'></img>
                        </div> 
                        : 
                        <div className='bg-black max-h-full max-w-full'>
                            <FaPhotoVideo className='text-[#800080] m-auto w-24 h-24 mb-4' />
                            {
                                isDragActive ?
                                <p>Drop images here</p> :
                                <p>Drag and drop, or click to select images</p>
                            }
                        </div>
                    }
                    <p>Click on the picture to choose another picture</p>
                </div>
                <button onClick={() => {
                    setValue(name, [])
                }}>Reset</button>
            </Paper>
            
        </div>
    )
}

export default FileUploader