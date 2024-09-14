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
        fontFamily: "'Exo 2', serif",
    },
    palette: {
        primary:{
            main : '#6a1b9a',
            mainLight: '#6a1b9a77',
            light : '#f5f5f5',
        },
        secondary:{
            main: '#333',    
            light: "#ebe8e8aa"
        },
        background: {
            main: '#f5f5f5'
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