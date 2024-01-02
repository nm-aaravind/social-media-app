import React from "react";
import { useGetRecentPosts } from "../../lib/react-query/queries";
import Loader from "../../components/Loader";
import Postcard from "../../components/Postcard";
import { useGetUser } from "../../lib/react-query/queries";
import { Box } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { createComment } from "../../lib/appwrite/apis";
function Home() {
  const { data: posts, isPending: isFetchingPosts } = useGetRecentPosts();
  const { data: user, isPending: isFetchingUser } = useGetUser();
  console.log(posts)
  React.useEffect(() => {
    document.title = "Heyo | Home";
  }, []);
  return (
    <Box
      color="primary"
      className="w-full flex justify-center home-container mb-32 md:mt-52 sm:mt-48 sm:px-20"
    >
      <PageHeader heading="Home" />
      {isFetchingPosts || !posts || isFetchingUser ? (
        <Loader message={"Hold on while we fetch your feed"} />
      ) : (
        <div className="post-container m-auto">
          <ul className="flex flex-col w-full gap-14">
            {posts.map((post) => (
              <Postcard post={post} user={user} />
            ))}
          </ul>
        </div>
      )}
    </Box>
  );
}

export default Home;
