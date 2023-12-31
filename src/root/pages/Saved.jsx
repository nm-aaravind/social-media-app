import React from "react";
import { useGetUser } from "../../lib/react-query/queries";
import { Box } from "@mui/material";
import GridPostList from "../../components/GridPostList";
import PageHeader from "../../components/PageHeader";
import Loader from "../../components/Loader";
function Saved() {
  const { data: user, isPending } = useGetUser();
  console.log(user, "Dei");
  return (
    <Box bgcolor="primary.main" className="w-full flex justify-center">
      <PageHeader heading="Saved" />
      {
        isPending ? <Loader message='Fetching saved posts'/> : <div className="lg:w-[80%] sm:w-full md:px-6 sm:py-56 md:pt-64 bg-[#272727]">
          <GridPostList posts={user.save} toDisplay="save" />
        </div>
      }
    </Box>
  );
}

export default Saved;
