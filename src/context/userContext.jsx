import React, { createContext, useContext, useEffect, useState } from "react"
import { getUser } from "../lib/appwrite/apis"
import { useNavigate } from "react-router-dom"


const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = React.useState({
        name: '',
        username: '',
        email: '',
        id: '',
        bio: '',
        imageUrl: '',
    })
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    console.log(isAuthenticated, userDetails, "Inside contexxt")
    const [isLoading, setIsLoading] = React.useState(false)
    const updateContext = (updatedProfile) => {
        userDetails.imageUrl = updatedProfile.profileimageurl
        userDetails.name = updatedProfile.name
        userDetails.username = updatedProfile.username
        userDetails.bio = updatedProfile.bio
    }
    const checkAuth = async () => {
        try {
            console.log("Entered checkAuth")
            const currentUser = await getUser();
            if (currentUser) {
                setUserDetails({
                    ...userDetails,
                    name: currentUser.name,
                    accountid: currentUser.$id,
                    username: currentUser.username,
                    email: currentUser.email,
                    imageUrl: currentUser.profileimageurl,
                    bio: currentUser.bio
                })
                setIsAuthenticated(true);
                return true;
            }
            return false
        } catch (error) {
            console.log(error)
            return false
        }

    }
    useEffect(() => {
        if (localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null) {
            navigate('/signin')
        }
        checkAuth()
    }, [])
    return (
        <UserContext.Provider value={{ userDetails, setUserDetails, checkAuth, isAuthenticated, setIsAuthenticated, isLoading, setIsLoading, updateContext }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext
