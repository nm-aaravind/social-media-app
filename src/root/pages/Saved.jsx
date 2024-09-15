import React from "react";
import { useGetUser } from "../../lib/react-query/queries";
import { Box, Typography, Divider } from "@mui/material";
import GridPostList from "../../components/GridPostList";
import Loader from "../../components/Loader";
function Saved() {
  const { data: user, isPending } = useGetUser();
  React.useEffect(() => {
    document.title = "Heyo | Saved Posts";
  }, []);
  if (isPending) return <Loader />
  return (
    <Box className="w-full flex justify-center">
        <div className="lg:w-[80%] sm:w-full md:px-6">
          <Typography variant="h4">Saved posts</Typography>
          <Divider />
          <GridPostList posts={user.save} toDisplay="save" />
        </div>
    </Box>
  );
}

export default Saved;
