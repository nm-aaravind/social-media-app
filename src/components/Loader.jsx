import { MutatingDots } from "react-loader-spinner";
import React from 'react'
import { Typography } from "@mui/material";

function Loader({ message }) {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <MutatingDots
                height="120"
                width="120"
                color="#50107d"
                secondaryColor="#8e1be0"
                radius="15"
                ariaLabel="mutating-dots-loading"
            />
            <Typography variant="h5" component={'p'} color={'purple'} align="center">{message}</Typography>
        </div>
    )
}

export default Loader