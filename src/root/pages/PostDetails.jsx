import React, { useContext } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { useGetPostById } from "../../lib/react-query/queries";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import PostStats from "../../components/PostStats";
import UserContext from "../../context/userContext";
function PostDetails() {
  const { id } = useParams();
  const { data: post, isPending: isFetchingPost } = useGetPostById(id);
  const { userDetails: user } = useContext(UserContext);
  React.useEffect(() => {
    document.title = "Heyo | Post Details";
  }, []);
  if (isFetchingPost) {
    return <Loader message="Fetching post" />;
  }
  console.log(post, "POST");
  return (
    <Box className="w-full">
      <Box className="sm:w-full xl:w-[75%] m-auto sm:px-10 md:px-5">
        <Typography variant="h4" className="pb-3" gutterBottom>
          Post Details
          <Divider />
        </Typography>
        <Grid
          container
          className="h-full border shadow-md rounded-md overflow-hidden"
        >
          <Grid borderRight={1} borderColor={"silver"} item xs={12} md={6}>
            <div className="sm:h-80 md:h-96">
              <div className="w-full overflow-hidden h-full">
                <img
                  className="m-auto object-cover w-full h-fit"
                  src={post?.image}
                />
              </div>
            </div>
            <PostStats post={post} userId={user?.$id} saves={undefined} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className="flex justify-between gap-8 flex-wrap p-5"
          >
            <Typography className="w-full" variant="h5">
              Comments
              <Divider />
            </Typography>
            {
              post?.comments.map((comment, index) => <li>{Hi}</li>)
            }
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default PostDetails;
