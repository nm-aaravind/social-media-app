import { Menu, MenuItem } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDeletePost } from '../lib/react-query/queries'
import PostStats from './PostStats'
import { Box } from '@mui/material'
import { MoreVertSharp } from '@mui/icons-material'
import styled from 'styled-components'
import Loader from './Loader'
import CommentsModal from './CommentsModal'

const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'Varela', sans-serif;
    font-size: 1rem;
    box-sizing: border-box;
    min-width: 200px;
    border-radius: 0px;
    overflow: auto;
    box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(255,255,255, 1)'
        };
    z-index: 1;
    `,
);

function Postcard({ post, saves, user }) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [isCommentsOpen, setIsCommentsOpen] = React.useState(false)
    const navigate = useNavigate()
    const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost()
    const open = Boolean(anchorEl)
    const handleDropDown = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleDropDownClose = () => {
        setAnchorEl(null)
    }
    return (
        <Box bgcolor='primary.light' border='1px solid #fff2' className='lg:w-[45rem] lg:h-[54rem] md:w-[40rem] md:h-[48rem] sm:w-full overflow-hidden drop-shadow-form'>
            <Box borderBottom='1px solid #fff2' className='header w-full sm:h-20 md:h-24 lg:h-28 flex justify-between items-center'>
                <Link to={`/profile/${post.user?.$id}`} className='float-left flex items-center'>
                    <img src={post.user?.profileimageurl} className='sm:w-12 md:w-14 lg:w-14 ml-9 mr-7'></img>
                    <p className='sm:text-xl md:text-2xl font-varela text-white -ml-3'>{post.user?.username}</p>
                </Link>
                {
                    user?.accountid === post.user?.accountid && <button onClick={handleDropDown} className='mr-6 rounded-full p-2 hover:bg-[#333] transition-all'>
                        <MoreVertSharp fontSize='large' color='secondary' />
                    </button>
                }
                <Menu PaperProps={{
                    style: {
                        backgroundColor: '#232323', // Set your desired grey background color here
                        marginTop: '1.2rem',
                        border: '3px solid #ebebeb33',
                        color: '#ebebeb',
                        borderRadius: '0px',
                        minWidth: '200px',
                        boxShadow: '0px 10px 5px rgba(0,0,0,0.6)'
                    },
                }} anchorEl={anchorEl} open={open} onClose={handleDropDownClose} slots={{ listbox: Listbox }}>
                    <MenuItem sx={{ '&:hover': { backgroundColor: '#333' }, fontSize: '1.4rem', height: '4rem' }} onClick={() => {
                        navigate(`update-post/${post.$id}`)
                        handleDropDownClose()
                    }}><p className='text-center  w-full'>Update Post</p></MenuItem>
                    <MenuItem onClick={() => {
                        handleDropDownClose()
                        deletePost({ postId: post.$id, imageId: post.imageId });
                    }} sx={{ '&:hover': { backgroundColor: '#333' }, fontSize: '1.4rem', color: '#f73123', height: '4rem' }} ><p className='text-center w-full'>Delete Post</p></MenuItem>
                </Menu>
            </Box>
            <div className='w-full overflow-hidden object-fill sm:h-[26rem] md:h-[33rem] lg:h-[36rem] bg-slate-600'>
                <img src={post.image} className='h-full w-full'></img>
            </div>
            <PostStats setIsCommentsOpen={setIsCommentsOpen} post={post} userId={user?.$id} saves={saves} />
            {
                isDeleting && <div className='absolute grid place-self-center top-0 w-full h-full bg-[#707070bb]'>
                    <Loader message="Deleting" />
                </div>
            }
            <CommentsModal postId={post.$id} setIsCommentsOpen={setIsCommentsOpen} open={isCommentsOpen} comments={post.comments.reverse()} />
        </Box>
    )
}

export default Postcard