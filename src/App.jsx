import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignInForm from './auth/form/SignInForm'
import SignUpForm from './auth/form/SignUpForm'
import AuthLayout from './auth/AuthLayout'
import Home from './root/pages/Home'
import RootLayout from './root/RootLayout'


function App() {
    return (
        <main>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route element={<SignUpForm />} path='/signup' />
                    <Route element={<SignInForm />} path='/signin' />
                </Route>
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </main>
    )
}
export default App