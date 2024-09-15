import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import UserContext from "../context/userContext";
import { useSignOut } from "../lib/react-query/queries";
import Loader from "./Loader";
const Sidebar = () => {
  const { userDetails: user } = useContext(UserContext);
  const {
    mutate: signOut,
    isPending: isSigningOut,
    isSuccess,
    isError,
  } = useSignOut();

  const navigate = useNavigate()
  useEffect(() => { 
      if (isSuccess) {
          navigate(0);
        }
        if (isError) {
            throw Error("Cannot sign out")
        }
    }, [isSuccess, isError]);
    if(isSigningOut){
      return <Loader message={"Logging out"}/>
    }
  return (
    <Box className="sm:hidden w-52 left-0 bottom-0 fixed z-50 text-xl top-0 px-3 pt-28 md:flex flex-col gap-2 bg-primary font-varela">
      <NavLink
        className={({ isActive }) =>
          [
            "w-full py-3 rounded-md text-center hover:bg-light hover:text-primary transition-all",
            isActive ? "bg-light text-primary" : "text-white",
          ]
            .filter(Boolean)
            .join(" ")
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        to="/create-post"
        className={({ isActive }) =>
          [
            "w-full py-3 rounded-md text-center  hover:bg-light hover:text-primary transition-all",
            isActive ? "bg-light text-primary" : "text-white",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        Create Post
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          [
            "w-full py-3 rounded-md text-center hover:bg-light hover:text-primary transition-all",
            isActive ? "bg-light text-primary" : "text-white",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        Explore
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) =>
          [
            "w-full py-3 rounded-md text-center hover:bg-light hover:text-primary transition-all",
            isActive ? "bg-light text-primary" : "text-white",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        Saved
      </NavLink>
      <NavLink
        to={`/profile/${user?.accountid}`}
        className={({ isActive }) =>
          [
            "w-full py-3 rounded-md text-center hover:bg-light hover:text-primary transition-all",
            isActive ? "bg-light text-primary" : "text-white",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        Profile
      </NavLink>
      <button
        onClick={() => {
            signOut()
        }}
        className="w-full mt-auto mb-5 bg-light py-3 rounded-md text-center text-red-600 hover:bg-red-600 hover:text-light transition-all"
      >
        Log out
      </button>
    </Box>
  );
};

export default Sidebar;
