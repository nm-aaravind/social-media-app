import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { Box, AppBar, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AuthLayout() {
  const { isAuthenticated } = useContext(UserContext);
  function showToast(type, message) {
    if(type == 'success'){
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if(type == 'error'){
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  return (
    <Box bgcolor="primary.main">
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "primary.light" }}
        className="drop-shadow-3xl w-full"
      >
        <Typography
          padding={"1rem"}
          align="center"
          variant="h2"
          component="h1"
          color="whitesmoke"
          className="cursor-default"
        >
          Heyo
        </Typography>
      </AppBar>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <Box className="flex items-center w-screen h-screen">
          <Outlet context={[showToast]} />
        </Box>
      )}
      <ToastContainer toastStyle={{ backgroundColor: "#272727", color: 'white', fontFamily: 'Varela Round', fontSize:'1.2rem' }}/>
    </Box>
  );
}

export default AuthLayout;
