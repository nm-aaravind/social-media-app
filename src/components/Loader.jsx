import { MutatingDots } from "react-loader-spinner";
import React from 'react'
import { Typography } from "@mui/material";

function Loader({ message }) {
    return (
        <div className="loader w-full overflow-hidden grid place-content-center">
            <div className="w-full place-content-center flex flex-col items-center">
            <MutatingDots
                height="100"
                width="100"
                color="#ebe8e8"
                secondaryColor="#606060"
                radius="15"
                ariaLabel="mutating-dots-loading"
            />
            <Typography variant="h5" component={'p'} color={'whitesmoke'} align="center">{message}</Typography>
        </div>
        </div>
    )
}

export default Loader