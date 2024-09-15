import React from "react";
import PostForm from "../../components/PostForm";
import { useCreatePost } from "../../lib/react-query/queries";
import Loader from "../../components/Loader";
import { Box } from "@mui/material";
function CreatePost() {
  React.useEffect(() => {
    document.title = "Heyo | Post";
  }, []);
  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
  return isCreating ? (
    <Loader message="Creating your post" />
  ) : (
    <Box className="flex flex-col w-full items-center h-full">
      <Box className="sm:w-full xl:w-[75%] sm:px-10 md:px-5">
        <PostForm mode="Create" method={createPost} />
      </Box>
    </Box>
  );
}

export default CreatePost;
