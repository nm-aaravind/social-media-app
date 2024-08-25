import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Bottombar from "../components/Bottombar";
import { Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function RootLayout() {
  function showToast(type, message) {
    if (type == "success") {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type == "error") {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <Box bgcolor='primary.light' className="w-full md:flex md:flex-col min-h-screen">
      <Navbar showToast={showToast} />
      <Box className="flex items-center w-full min-h-screen">
        <Outlet context={[showToast]} />
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
