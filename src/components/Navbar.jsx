// import { Typography, AppBar, Menu, MenuItem } from '@mui/material'
// import React, { useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
// import UserContext from '../context/userContext'
// import { useGetUser, useSignOut } from '../lib/react-query/queries'
// import { styled } from '@mui/system';

// const Listbox = styled('ul')(
//   ({ theme }) => `
//   font-family: 'Varela', sans-serif;
//   font-size: 1rem;
//   box-sizing: border-box;
//   min-width: 200px;
//   border-radius: 0px;
//   overflow: auto;
//   box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(255,255,255, 1)'
//     };
//   z-index: 1;
//   `,
// );

// function Navbar({ showToast }) {
//   const { data:user, isPending } = useGetUser();
//   const { mutate: signOut, isSuccess, isError } = useSignOut()
//   const navigate = useNavigate()
//   useEffect(() => {
//     if (isSuccess) {
//       showToast('success', "Signed out !")
//       navigate(0)
//     }
//     if(isError){
//       showToast("error", "Error signing out")
//     }
//   }, [isSuccess, isError])

//   const [anchorEl, setAnchorEl] = React.useState(null)
//   const open = Boolean(anchorEl)

//   const handleDropDown = (event) => {
//     setAnchorEl(event.currentTarget)
//   }
//   const handleDropDownClose = () => {
//     setAnchorEl(null)
//   }

//   const handleSignout = () => {
//     signOut();
//     handleDropDownClose();
//   }

//   return (
//     <AppBar position='fixed' sx={{ backgroundColor: 'primary.light' }} className='drop-shadow-3xl overflow-hidden sm:h-20 md:h-24'>
//       <div className={`p-2 sm:w-[87%] m-auto flex justify-between items-center transition-all`}>
//         <h1 color='whitesmoke' className='sm:text-4xl md:text-6xl font-varela'>
//           <Link to={'/'}>Heyo</Link>
//         </h1>
//         <button className={`m-4 hover:scale-110 ${anchorEl ? 'scale-110' : ''} visible transition-all`} onClick={handleDropDown}>
//           <img src={user?.profileimageurl} alt="profile-image" className='md:w-14 sm:w-11' />
//         </button>
//         <Menu PaperProps={{
//           style: {
//             backgroundColor: '#232323', // Set your desired grey background color here
//             marginTop: '1.2rem',
//             border: '3px solid #ebebeb33',
//             color: '#ebebeb',
//             borderRadius: '0px',
//             minWidth: '200px',
//             boxShadow: '0px 10px 5px rgba(0,0,0,0.6)'
//             // Set your desired margin value here
//           },
//         }} anchorEl={anchorEl} open={open} onClose={handleDropDownClose} slots={{ listbox: Listbox }}>
//           <MenuItem sx={{ '&:hover': { backgroundColor: '#333' }, fontSize: '1.4rem', height: '4rem' }} onClick={() => {
//             navigate(`profile/${user?.accountid}`)
//             handleDropDownClose()
//           }}><p className='text-center  w-full'>Profile</p></MenuItem>
//           <MenuItem sx={{ '&:hover': { backgroundColor: '#333' }, fontSize: '1.4rem', color: '#f73123', height: '4rem' }} onClick={handleSignout}><p className='text-center w-full'>Log out</p></MenuItem>
//         </Menu>

//       </div>
//     </AppBar>
//   )
// }

import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Menu, MenuItem, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import { useGetUser, useSignOut } from '../lib/react-query/queries'
import UserContext from '../context/userContext';

const Listbox = styled('ul')(({ theme }) => `
  font-family: 'Varela', sans-serif;
  font-size: 1rem;
  min-width: 200px;
  overflow: auto;
  z-index: 1;
`);

function Navbar({ showToast }) {
  const { data: user } = useGetUser();
  const { mutate: signOut, isSuccess, isError } = useSignOut();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isSuccess) {
      showToast('success', "Signed out!");
      navigate(0);
    }
    if (isError) {
      showToast("error", "Error signing out");
    }
  }, [isSuccess, isError, showToast, navigate]);

  const handleDropDown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropDownClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    signOut();
    handleDropDownClose();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#6a1b9a' }} className="shadow-md">
      <Box className="flex justify-between items-center p-4 mx-auto w-full max-w-screen-lg">
        <Typography variant="h4" component="h1" color="whitesmoke" className="font-varela">
          <Link to="/">Heyo</Link>
        </Typography>
        {
          isAuthenticated && <Box>
          <button onClick={handleDropDown}>
            <img
              src={user?.profileimageurl}
              alt="profile"
              className="w-12 h-12 rounded-full transition-transform"
            />
          </button>
          <Menu
            PaperProps={{
              style: {
                backgroundColor: '#6a1b9a',
                marginTop: '1rem',
                color: '#ffffff',
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleDropDownClose}
            slots={{ listbox: Listbox }}
          >
            <MenuItem onClick={() => { navigate(`profile/${user?.accountid}`); handleDropDownClose(); }}>
              Profile
            </MenuItem>
            <MenuItem sx={{ color: '#f73123' }} onClick={handleSignout}>
              Log out
            </MenuItem>
          </Menu>
        </Box>
        }
      </Box>
    </AppBar>
  );
}
export default Navbar