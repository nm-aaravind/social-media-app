import { Box, Typography, Button, Divider } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
const ProfileCard = ({ user }) => {
    return (
        <Box boxShadow='0px 5px 5px rgba(0,0,0,0.5)' className='drop-shadow-3xl lg:w-[75%]' bgcolor='primary.light' width="100%">
            <div className='flex flex-col flex-wrap p-20 gap-10 w-full'>
                <div className='flex gap-16 flex-wrap sm:justify-center sm:gap-10 md:justify-normal lg:gap-12'>
                    <img className='lg:w-36 xs:w-20 md:w-32' src={user.profileimageurl}></img>
                    <div className=''>
                        <Typography color='secondary' variant='h3' component='p'>{user.name}</Typography>
                        <Typography color='secondary.light' variant='h4' component='p'>@{user.username}</Typography>
                    </div>
                </div>
                {
                    user.bio && <div className=''>
                        <Divider className=' bg-white' />
                        {/* <Typography variant='h3' component='p' color='secondary'>Bio</Typography> */}
                        <Typography marginTop={'1rem'} variant='h5' component='p' color='secondary'>{user.bio}</Typography>
                    </div>
                }
                <Link className='w-full' to={`/update-profile/${user.accountid}`}>
                    <Button variant="outlined" color='secondary' sx={{ fontSize: '18px', height: '49px', borderRadius: 0, width: '100%', boxShadow: '0px 5px 5px rgba(0,0,0,0.5)', ":hover": { backgroundColor: 'info.main', border: 'lightsalmon', color: 'white' } }} className='drop-shadow-form-field'>
                        <Typography variant='h6'>EDIT PROFILE</Typography>
                    </Button>
                </Link>
            </div>
        </Box>
    )
}

export default ProfileCard