import React, { useCallback, useState, memo, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaPhotoVideo } from "react-icons/fa";
import { Paper, Typography } from '@mui/material';
import {Divider} from '@mui/material';

function FileUploader() {

    const [files, setFiles] = React.useState([])

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            setFiles((prevFiles) => [
                ...prevFiles,
                ...acceptedFiles.map((file) => {
                    return Object.assign(file, { preview: URL.createObjectURL(file) })
                })
            ])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/png': ['.png', '.jpg', '.jpeg'],
        }
    })

    function removeFile(file) {
        let newFiles = [...files]
        newFiles.splice(newFiles.indexOf(file), 1)
        setFiles(newFiles)
    }

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <div className='p-4'>
            <Paper elevation={1} sx={{
                backgroundColor: '#F1F5F9', borderColor: 'darkgray', borderWidth: '0.5px', ":hover": {
                    borderColor: 'black'
                }
            }}>
                <div {...getRootProps({
                    className: 'text-[#800080] w-full h-72 font-varela px-3 cursor-pointer grid place-content-center text-2xl'
                })}>
                    <input {...getInputProps()} />
                    <FaPhotoVideo className='text-[#800080] m-auto w-24 h-24 mb-4' />
                    {
                        isDragActive ?
                            <p>Drop images here</p> :
                            <p>Drag and drop, or click to select images</p>
                    }
                </div>
            </Paper>
            {files.length > 0 && <div className='flex flex-col rounded-lg bg-purple-500/40 mt-4'>
                <Typography variant='h4' component={'p'} color={'purple'} align='center' marginTop={'10px'}>Preview</Typography>
                <Divider style={{ backgroundColor: 'whitesmoke', height: '4px', width: '100%' }} />
                <aside className='flex items-center flex-wrap gap-3 p-4'>
                {files.map(file =>
                    <li key={file.preview} className='flex flex-col list-none w-[13.5rem]'>
                        <img className='rounded-t-lg hover:opacity-70 transition-opacity' src={file.preview}></img>
                        <button className='text-center rounded-b-lg font-varela text-xl p-2 text-slate-100 bg-red-600 hover:bg-red-700' onClick={(file) => removeFile(file)}>Remove</button>
                    </li>
                )}
            </aside>
            </div>}

        </div>
    )
}

export default memo(FileUploader)