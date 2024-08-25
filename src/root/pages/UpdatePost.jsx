import { Typography } from "@mui/material";
import React from "react";
import { IoImages } from "react-icons/io5";
import PostForm from "../../components/PostForm";
import { useParams } from "react-router-dom";
import { useGetPostById, useUpdatePost } from "../../lib/react-query/queries";
import Loader from "../../components/Loader";
import { Box } from "@mui/material";
function UpdatePost() {
  const { id } = useParams();
  const { data: post, isPending: isFetching } = useGetPostById(id);
  const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost();
  React.useEffect(() => {
    document.title = "Heyo | Update Post";
  }, []);
  return isFetching || isUpdating ? (
    <Loader
      message={isFetching ? "Fetching your post" : "Updating your post"}
    />
  ) : (
    <Box className="flex flex-col w-full items-center">
      <Box className="sm:w-full lg:w-[min(80%,1200px)] mt-36">
        <PostForm mode="update" post={post} method={updatePost} />
      </Box>
    </Box>
  );
}

export default UpdatePost;
