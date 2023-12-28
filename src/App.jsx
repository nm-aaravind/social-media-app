import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignInForm from './auth/form/SignInForm'
import SignUpForm from './auth/form/SignUpForm'
import AuthLayout from './auth/AuthLayout'
import { RootLayout,Home, Explore, Saved, CreatePost, UpdatePost, UpdateProfile, Profile, Users } from './root/index'


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
                    <Route path='/explore' element={<Explore />} />
                    <Route path='/saved' element={<Saved />} />
                    <Route path='/create-post' element={<CreatePost />} />
                    {/* <Route path='/users' element={<Users />} /> */}
                    <Route path='/update-post/:id' element={<UpdatePost />} />
                    <Route path='/profile/:id' element={<Profile />} />
                    <Route path='/update-profile/:id' element={<UpdateProfile />} />
                </Route>
            </Routes>
        </main>
    )
}
export default App