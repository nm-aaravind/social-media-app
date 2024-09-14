import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import UserContext from "../context/userContext";
import { ToastContainer } from "react-toastify";
function RootLayout() {
  const { checkAuth } = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    console.log(checkAuth(), "Auth")
    if(!checkAuth()){
      navigate('/signin')
    }
  }, [])
  return (
    <Box bgcolor='primary.light' className="w-full md:flex md:flex-col min-h-screen">
      <Navbar />
      <Box className="flex items-center w-full min-h-screen">
        <Outlet />
      </Box>
      <ToastContainer 
        toastStyle={{
          backgroundColor: "white",
          fontFamily: "Exo 2",
          fontSize: "1rem",
        }}
      />
    </Box>
  );
}

export default RootLayout;
