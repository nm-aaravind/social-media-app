import LoaderAnimation from "/assets/loader.svg"
import React from 'react'
import { Typography } from "@mui/material";

function Loader({ message }) {
    return (
        <div className="absolute left-0 top-0 bottom-0 right-0 grid place-items-center bg-white">
            <div className="w-full backdrop:blur-md place-content-center flex flex-col items-center">
            <img className="w-24 h-24" src={LoaderAnimation}/>
            <Typography variant="h5" color='#6A1B9A' align="center">{message}</Typography>
        </div>
        </div>
    )
}

export default Loader