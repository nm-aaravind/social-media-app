import React from "react";
import ProfileCard from "../../components/ProfileCard";
import { Box, Typography, Divider } from "@mui/material";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { useGetUser, useGetUserById } from "../../lib/react-query/queries";
import GridPostList from "../../components/GridPostList";
const Profile = () => {
  const { id } = useParams();
  const { data: loggedInUser, isPending: isFetchingCurrentUser } = useGetUser();
  const { data: user, isPending: isFetchingUser } = useGetUserById({
    accountid: id,
  });

  React.useEffect(() => {
    document.title = "Heyo | Profile";
  }, []);

  if (isFetchingCurrentUser || isFetchingUser) {
    return <Loader message="Fetching user" />;
  }

  let follow_object = null;

  for (let followers of user?.followers) {
    if (followers.following?.$id === loggedInUser?.$id) {
      follow_object = followers;
      break;
    }
  }
  const following = follow_object ? true : false;

  return (
    <Box bgcolor="primary.light" className="bg-red-500 w-full">
      <Box className="sm:w-full xl:w-[90%] sm:px-10 gap-5 m-auto flex flex-col">
        <ProfileCard
          userToDisplay={user}
          currentUser={loggedInUser}
          following={following}
          follow_object={follow_object}
        />
        {(following || (user?.$id === loggedInUser?.$id)) && (
          <Box className="bg-white border border-primary-light rounded">
            <Box className="flex flex-col gap-3 p-5">
              <Typography
                variant="p"
                component="p"
                color="secondary"
                className="sm:text-2xl md:text-4xl font-varela"
              >
                Posts
              </Typography>
              <Divider />
            </Box>
            <Box className="px-5 pb-5">
              {user?.posts.length > 0 ? (
                <GridPostList posts={user.posts} toDisplay="profile" />
              ) : (
                <Typography
                  sx={{
                    marginBottom: "3rem",
                    textAlign: "center",
                  }}
                  variant="h4"
                  component="p"
                  color="secondary"
                >
                  No posts yet
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
