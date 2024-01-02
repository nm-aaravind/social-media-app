import React, { useContext } from "react";
import ProfileCard from "../../components/ProfileCard";
import { Box, Typography, Divider } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { useGetUser, useGetUserById } from "../../lib/react-query/queries";
import GridPostList from "../../components/GridPostList";
import UserContext from "../../context/userContext";
const Profile = () => {
  const { id } = useParams();
  const { data: loggedInUser, isPending: isFetchingCurrentUser } = useGetUser();
  const { data: user, isPending: isFetchingUser } = useGetUserById({ accountid: id });
  React.useEffect(() => {
    document.title = "Heyo | Profile";
  }, []);
  return (
    <Box className="w-full flex justify-center">
      <PageHeader heading="Profile" />
      {isFetchingUser || isFetchingCurrentUser ? (
        <Loader />
      ) : (
        <div className="sm:w-full xl:w-[85%] sm:px-12 md:px-14 flex flex-col gap-10 pt-52">
          <ProfileCard userToDisplay={user} currentUser={loggedInUser} />
          <div className="bg-[#272727] pt-10 px-2 flex flex-col gap-5 ">
            <div className="px-4 pt-2 flex flex-col gap-5 w-full justify-between mb-6 ">
              <Typography paddingX={'3rem'} variant="h4" component="h3" color="secondary">
                Posts
              </Typography>
              <Divider className=" bg-white w-[95%] self-center" />
            </div>
            <div className="px-4">
              {
                user?.posts.length > 0 ? <GridPostList posts={user.posts} toDisplay="profile" /> : <Typography marginBottom={'3rem'} align="center" variant="h4" component='p' color='secondary'>No posts yet</Typography>
              }
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Profile;
