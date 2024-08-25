import React from "react";
import { Box } from "@mui/material";
import { useGetUser } from "../../lib/react-query/queries";
import ProfileForm from "../../components/ProfileForm";
import Loader from "../../components/Loader";
function UpdateProfile() {
  const { data: user, isPending } = useGetUser();
  React.useEffect(() => {
    document.title = "Heyo | Update Profile";
  }, []);
  return (
    <Box className="flex flex-col w-full items-center">
      {isPending ? (
        <Loader message="Loading profile" />
      ) : (
        <Box className="sm:w-full lg:w-[min(80%,1200px)]">
          <ProfileForm user={user} />
        </Box>
      )}
    </Box>
  );
}

export default UpdateProfile;
