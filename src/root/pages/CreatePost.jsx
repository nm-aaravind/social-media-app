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
    <Box className="flex flex-col w-full items-center h-full -mt-32">
      <Box className="sm:w-full lg:w-[min(80%,1200px)]">
        <PostForm mode="Create" method={createPost} />
      </Box>
    </Box>
  );
}

export default CreatePost;
