import { Edit, PersonAdd, PersonRemove } from "@mui/icons-material";
import { Box, Typography, Button, Divider } from "@mui/material";
import React , {useContext} from "react";
import { Link } from "react-router-dom";
import { useAddFollower, useRemoveFollower } from "../lib/react-query/queries";
import UserContext from "../context/userContext";
const ProfileCard = ({
  userToDisplay,
  currentUser,
  follow_object,
  following,
}) => {
  const { mutateAsync: addFollower, isPending: isAddingFollower } =
    useAddFollower();
  const { mutateAsync: removeFollower, isPending: isRemovingFollower } =
    useRemoveFollower();
  const {showToast} = useContext(UserContext);
  async function addFollowerHandler() {
    try {
      const follow = await addFollower({
        toFollowId: userToDisplay.$id,
        followingId: currentUser.$id,
      });
      if (!follow) {
        throw Error("Cannot follow");
      }
      showToast("success", "Followed");
    } catch (error) {
      showToast("error", `Error: ${error.message}`);
      throw error;
    }
  }
  async function removeFollowerHandler() {
    try {
      const { status } = await removeFollower(follow_object?.$id);
      if (status != "ok") throw Error("Cannot unfollow");
      showToast("success", "Unfollowed");
    } catch (error) {
      showToast("error", `Error: ${error.message}`);
      throw error;
    }
  }
  return (
    <Box
      className="rounded-md border border-[#6a1b9a66] m-auto"
      bgcolor="white"
      width="100%"
    >
      <div className="flex flex-col flex-wrap sm:p-5 md:p-10 sm:gap-2 md:gap-10 w-full">
        <div className="flex gap-16 sm:justify-start sm:gap-5 md:justify-normal md:gap-12">
          <img
            className="sm:w-24 sm:h-24 md:h-32 md:w-32 lg:w-40 lg:h-40 rounded-full"
            src={userToDisplay?.profileimageurl}
          ></img>
          <div className="">
            <Typography
              color="secondary"
              variant="p"
              component="p"
              className="text-left font-varela sm:text-3xl md:text-5xl"
            >
              {userToDisplay.name}
            </Typography>
            <Typography
              className="text-left font-varela sm:text-xl md:text-4xl"
              variant="p"
              component="p"
              color="secondary"
            >
              @{userToDisplay.username}
            </Typography>
            <div className="flex sm:gap-3 md:gap-8 md:mt-4">
              <Link to={"followers"} className="p-1">
                <Typography
                  className="sm:text-center md:text-left font-varela sm:text-lg md:text-2xl"
                  variant="p"
                  component="p"
                  color="secondary"
                >
                  {userToDisplay.followers.length} followers
                </Typography>
              </Link>
              <Link to={"followers"} className="p-1">
              <Typography
                  className="sm:text-center md:text-left font-varela sm:text-lg md:text-2xl"
                  variant="p"
                  component="p"
                  color="secondary"
                >
                  {userToDisplay.following.length} following
                </Typography>

              </Link>
            </div>
          </div>
        </div>
        {userToDisplay.bio && (
          <div className="">
            <Divider className=" bg-white" />
            <Typography
              marginTop={"1rem"}
              variant="p"
              component="p"
              className="font-varela sm:text-xl md:text-2xl"
              color="secondary"
            >
              {userToDisplay.bio}
            </Typography>
          </div>
        )}
        {userToDisplay.$id === currentUser?.$id ? (
          <Link
            className="w-full"
            to={`/update-profile/${userToDisplay.accountid}`}
          >
            <Button variant="contained" color="primary" fullWidth type="submit">
              <Edit className="m-1" />
              <Typography variant="p">Edit Profile</Typography>
            </Button>
          </Link>
        ) : following ? (
          <Button
            onClick={removeFollowerHandler}
            variant="contained"
            color="error"
            fullWidth
            type="submit"
            disabled={isRemovingFollower}
          >
            <PersonRemove className="mb-1 mr-2" />
            <Typography variant="p">Unfollow</Typography>
          </Button>
        ) : (
          <Button
            onClick={addFollowerHandler}
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            disabled={isAddingFollower}
          >
            <PersonAdd className="mb-1 mr-2" />
            <Typography variant="p">Follow</Typography>
          </Button>
        )}
      </div>
    </Box>
  );
};

export default ProfileCard;
