import React from "react";
import { useGetRecentPosts } from "../../lib/react-query/queries";
import Loader from "../../components/Loader";
import Postcard from "../../components/Postcard";
import { NavLink } from "react-router-dom";
import { useGetUser } from "../../lib/react-query/queries";
import { Box } from "@mui/material";
import { createComment } from "../../lib/appwrite/apis";
function Home() {
  const { data: user, isPending: isFetchingUser, isError } = useGetUser();
  const { data: posts, isPending: isFetchingPosts } = useGetRecentPosts(user?.$id);
  
  React.useEffect(() => {
    document.title = "Heyo | Home";
  }, []);
  if (isFetchingUser || isFetchingPosts) {
    return <Loader message={"Hold on while we fetch your feed"} />;
  }
  return (
    <Box className="w-full flex h-full m-auto pt-32 md:px-20 sm:px-4">
      <Box className="sm:hidden w-1/5 mx-auto md:flex border overflow-hidden border-[#6a1b9a77] rounded-lg flex-col sticky top-32 h-fit text-purple-900">
        <NavLink
          className="w-full p-4 text-center hover:bg-primary-light"
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#6a1b9a77" : "",
            color: isActive ? "white" : "#6a1b9a",
          })}
        >
          Home
        </NavLink>
        <NavLink
          className="w-full p-4 text-center hover:bg-primary-light hover:text-white transition-all"
          to="/create-post"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "purple" : "",
          })}
        >
          Create Post
        </NavLink>
        <NavLink
          className="w-full p-4 text-center hover:bg-primary-light hover:text-white transition-all"
          to="/explore"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "purple" : "",
          })}
        >
          Explore
        </NavLink>
        <NavLink
          className="w-full p-4 text-center hover:bg-primary-light hover:text-white transition-all"
          to="/saved"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "purple" : "",
          })}
        >
          Saved
        </NavLink>
        <NavLink
          className="w-full p-4 text-center hover:bg-primary-light hover:text-white transition-all"
          to={`/profile/${user?.accountid}`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "purple" : "",
          })}
        >
          Profile
        </NavLink>
      </Box>
      <Box className="flex-grow flex justify-center">
        <div className="post-container w-full max-w-4xl md:ml-8">
          <ul className="flex flex-col w-full sm:gap-8 md:gap-14">
            {posts?.map((post) => (
              <Postcard key={post.$id} post={post} user={user} />
            ))}
          </ul>
        </div>
      </Box>
    </Box>
  );
}

export default Home;
