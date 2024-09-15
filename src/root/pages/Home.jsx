import React from "react";
import { useGetRecentPosts } from "../../lib/react-query/queries";
import Loader from "../../components/Loader";
import Postcard from "../../components/Postcard";
import { NavLink } from "react-router-dom";
import { useGetUser } from "../../lib/react-query/queries";
import { Box, Typography } from "@mui/material";
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
    <Box className="sm:w-full xl:w-[90%] flex h-full mb-10">
      <Box className="flex justify-center m-auto">
          <ul className="flex flex-col w-full sm:gap-8 md:gap-14">
            {
              posts.length > 0 ? posts?.map((post) => (
                <Postcard key={post.$id} post={post} user={user} />
              )) : <Typography>Hey follow people</Typography>
            }
          </ul>
      </Box>
    </Box>
  );
}

export default Home;
