import React from "react";
import PostForm from "../../components/PostForm";
import { useCreatePost } from "../../lib/react-query/queries";
import Loader from "../../components/Loader";
import { Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
function CreatePost() {
  React.useEffect(() => {
    document.title = "Heyo | Post";
  }, []);
  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
  return isCreating ? (
    <Loader message="Creating your post" />
  ) : (
    <Box className="flex flex-col w-full items-center">
      <Box className="sm:w-full sm:p-4 md:p-8 lg:w-[min(80%,1200px)] md:mt-48 sm:mt-40">
        <PostForm mode="create" method={createPost} />
      </Box>
    </Box>
  );
}

export default CreatePost;
