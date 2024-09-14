import React, { createContext, useContext, useEffect, useState } from "react"
import { getUser } from "../lib/appwrite/apis"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = React.useState({
        name: '',
        username: '',
        email: '',
        $id: '',
        bio: '',
        imageUrl: '',
    })
    function showToast(type, message) {
        if (type == "success") {
          toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (type == "error") {
          toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const updateContext = (updatedProfile) => {
        userDetails.imageUrl = updatedProfile.profileimageurl
        userDetails.name = updatedProfile.name
        userDetails.username = updatedProfile.username
        userDetails.bio = updatedProfile.bio
    }
    const checkAuth = async () => {
        try {
            const currentUser = await getUser();
            if (currentUser) {
                setUserDetails({
                    ...userDetails,
                    name: currentUser.name,
                    username: currentUser.username,
                    email: currentUser.email,
                    imageUrl: currentUser.profileimageurl,
                    bio: currentUser.bio,
                    $id: currentUser.$id
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
    }, [])
    return (
        <UserContext.Provider value={{ userDetails, showToast,setUserDetails, checkAuth, isAuthenticated, setIsAuthenticated, isLoading, setIsLoading, updateContext }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext
