import React from "react";
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { UserProvider } from "./context/userContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";


const theme = createTheme({
    typography: {
        fontFamily: "'Varela Round', sans-serif",
    },
    palette: {
        primary:{
            main : '#161616',
            light : '#272727',
        },
        secondary:{
            main: '#ebe8e8',
            light: "#ebe8e8aa"

        }
    }

})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <QueryProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </QueryProvider>
        </BrowserRouter>
    </ThemeProvider>
)