import React from "react";
import { useGetRecentPosts } from "../../lib/react-query/queries";
import Loader from "../../components/Loader";
import Postcard from "../../components/Postcard";
import { NavLink } from "react-router-dom";
import { useGetUser } from "../../lib/react-query/queries";
import { Box } from "@mui/material";
import { createComment } from "../../lib/appwrite/apis";
function Home() {
  const { data: posts, isPending: isFetchingPosts } = useGetRecentPosts();
  const { data: user, isPending: isFetchingUser, isError } = useGetUser();

  React.useEffect(() => {
    document.title = "Heyo | Home";
  }, []);
  if (isFetchingUser || isFetchingPosts) {
    return <Loader message={"Hold on while we fetch your feed"} />;
  }
  return (
    // <Box
    //   color="primary"
    //   className="w-full flex justify-center home-container mb-32 md:mt-52 sm:mt-48 sm:px-20"
    // >
    //     <div className="post-container m-auto">
    //       <ul className="flex flex-col w-full gap-14">
    //         {posts.map((post) => (
    //           <Postcard post={post} user={user} />
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </Box>
    <Box className="w-full flex h-full m-auto pt-32 md:px-20 sm:px-4">
      <Box className="sm:hidden w-1/5 mx-auto md:flex border overflow-hidden border-[#6a1b9a77] rounded-lg flex-col sticky top-32 h-fit text-purple-900">
        <NavLink
          className="w-full p-4 text-center"
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#6a1b9a77" : "white",
            color: isActive ? "white" : "#6a1b9a",
          })}
        >
          Home
        </NavLink>
        <NavLink
          className="w-full p-4 text-center"
          to="/create-post"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "purple" : "white",
          })}
        >
          Create Post
        </NavLink>
        <NavLink
          className="w-full p-4 text-center"
          to="/explore"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "purple" : "white",
          })}
        >
          Explore
        </NavLink>
        <NavLink
          className="w-full p-4 text-center"
          to="/saved"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "purple" : "white",
          })}
        >
          Saved
        </NavLink>
        <NavLink
          className="w-full p-4 text-center"
          to={`/profile/${user?.accountid}`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "purple" : "white",
          })}
        >
          Profile
        </NavLink>
      </Box>
      <Box className="flex-grow flex justify-center">
        <div className="post-container w-full max-w-4xl md:ml-8">
          <ul className="flex flex-col w-full sm:gap-8 md:gap-14">
            {posts.map((post) => (
              <Postcard key={post.$id} post={post} user={user} />
            ))}
          </ul>
        </div>
      </Box>
    </Box>
  );
}

export default Home;
