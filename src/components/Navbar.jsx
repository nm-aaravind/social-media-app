import React, { useEffect, useContext } from 'react';
import { AppBar, Typography, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useGetUser, useSignOut } from '../lib/react-query/queries'
import UserContext from '../context/userContext';
import Dropdown from './Dropdown';
import Loader from './Loader';

function Navbar() {
  console.log("HEy av")
  const { data: user } = useGetUser();
  const { mutate: signOut, isPending: isSigningOut, isSuccess, isError } = useSignOut();
  const navigate = useNavigate();
  const { isAuthenticated, showToast } = useContext(UserContext)

  useEffect(() => {
    if (isSuccess) {
      showToast('success', "Signed out!");
      navigate(0);
    }
    if (isError) {
      showToast("error", "Error signing out");
    }
  }, [isSuccess, isError]);


  const handleSignout = () => {
    signOut();
    handleDropDownClose();
  };

  if(isSigningOut){
    return <Loader message={"Signing out"}/>
  }
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#6a1b9a' }} className="shadow-md h-24">
      <Box className="flex justify-between items-center p-4 mx-auto w-full max-w-screen-lg h-full">
        <Typography variant="h4" component="h1" color="whitesmoke" className="font-varela">
          <Link to="/">Heyo</Link>
        </Typography>
        {
          isAuthenticated && 
        <Dropdown content={[
          {
            value: "Profile",
            action: navigate,
            arg: `profile/${user?.accountid}`
          },
          {
            value: "Log out",
            action:handleSignout
          }
        ]}>
          <img
              src={user?.profileimageurl}
              alt="profile"
              className="w-12 h-12 rounded-full transition-transform"
            />
        </Dropdown>
        }
      </Box>
    </AppBar>
  );
}
export default React.memo(Navbar)