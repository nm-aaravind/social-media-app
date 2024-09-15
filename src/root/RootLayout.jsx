import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import UserContext from "../context/userContext";
import { ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import Bottombar from "../components/Bottombar";
function RootLayout() {
  const {
    checkAuth,
    isAuthenticating,
    isAuthenticated,
    userDetails: user,
  } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkAuth()) {
      navigate("/signin");
    }
  }, []);
  return (
    <Box bgcolor="primary.light" className="w-full md:flex h-full">
      <Navbar />
      {isAuthenticated && (
        <div className="sm:hidden md:block md:w-52 relative">
          <Sidebar />
        </div>
      )}
      <Box className="flex items-center w-full relative pt-32">
        <Outlet />
      </Box>
      {isAuthenticated && <Bottombar />}
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
