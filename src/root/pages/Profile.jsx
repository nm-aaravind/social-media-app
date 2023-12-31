import React from "react";
import ProfileCard from "../../components/ProfileCard";
import { Box, Typography, Divider } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { useGetUser } from "../../lib/react-query/queries";
import GridPostList from "../../components/GridPostList";
const Profile = () => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUser(id);
  React.useEffect(() => {
    document.title = "Heyo | Profile";
  }, []);
  return (
    <Box className="w-full flex justify-center">
      <PageHeader heading="Profile" />
      {isPending ? (
        <Loader />
      ) : (
        <div className="sm:w-full xl:w-[85%] sm:px-12 md:px-14 flex flex-col gap-10 pt-48">
          <ProfileCard user={user} />
          <div className="bg-[#272727] pt-10 px-2 flex flex-col gap-5">
            <div className="px-4 pt-2 flex flex-col gap-5 w-full justify-between mb-6">
              <Typography variant="h4" component="h3" color="secondary">
                Posts
              </Typography>
              <Divider className=" bg-white w-[99%]" />
            </div>
            <div className="px-4">
              <GridPostList posts={user.posts} toDisplay="profile" />
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Profile;
