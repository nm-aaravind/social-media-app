import LoaderAnimation from "/assets/loader.svg";
import React, { useContext } from "react";
import { Typography } from "@mui/material";
import UserContext from "../context/userContext";

function Loader({ message }) {
    const {isAuthenticated} = useContext(UserContext)
  return (
    <div className={`fixed z-40 left-0 md:${isAuthenticated && "left-52"} top-0 bottom-0 right-0 grid place-items-center bg-light`}>
      <div className="w-full grid place-items-center">
        <img className="w-24 h-24" src={LoaderAnimation} />
        <Typography variant="h5" color="#6A1B9A" align="center">
          {message}
        </Typography>
      </div>
    </div>
  );
}

export default Loader;
