import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Bottombar from "../components/Bottombar";
import { Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function RootLayout() {
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
    <Box
      bgcolor="primary.main"
      className="w-full md:flex md:flex-col min-h-screen"
    >
      <Navbar showToast = {showToast} />
      <section className="flex flex-1">
        <Outlet context={[showToast]}/>
      </section>
      <Bottombar />
      <ToastContainer toastStyle={{ backgroundColor: "#272727", color: 'white', fontFamily: 'Varela Round', fontSize:'1.2rem' }}/>
    </Box>
  );
}

export default RootLayout;
