import { Edit, PersonAdd, PersonRemove } from "@mui/icons-material";
import { Box, Typography, Button, Divider, useRadioGroup } from "@mui/material";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useAddFollower, useRemoveFollower } from "../lib/react-query/queries";
const ProfileCard = ({
  userToDisplay,
  currentUser,
  follow_object,
  following,
}) => {
  const { mutateAsync: addFollower, isPending: isAddingFollower } =
    useAddFollower();
  const [showToast] = useOutletContext();
  const { mutateAsync: removeFollower, isPending: isRemovingFollower } =
    useRemoveFollower();

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
      className="rounded-md border border-[#6a1b9a66]"
      bgcolor="white"
      width="100%"
    >
      <div className="flex flex-col flex-wrap p-10 sm:gap-5 md:gap-10 w-full">
        <div className="flex gap-16 flex-wrap sm:justify-center sm:gap-3 md:justify-normal lg:gap-12">
          <img
            className="lg:w-40 sm:w-48 md:w-36 rounded-full"
            src={userToDisplay?.profileimageurl}
          ></img>
          <div className="">
            <Typography
              color="secondary"
              variant="h3"
              component="p"
              className="sm:text-center md:text-left"
            >
              {userToDisplay.name}
            </Typography>
            <Typography
              className="sm:text-center md:text-left"
              variant="h4"
              component="p"
              color="secondary"
            >
              @{userToDisplay.username}
            </Typography>
            <div className="flex gap-10 mt-4">
              <Link to={"followers"} className="p-1">
                <Typography
                  className="sm:text-center md:text-left"
                  variant="h5"
                  component="p"
                  color="secondary"
                >
                  {userToDisplay.followers.length} followers
                </Typography>
              </Link>
              <Link to={"followers"} className="p-1">
              <Typography
                  className="sm:text-center md:text-left"
                  variant="h5"
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
              variant="h5"
              component="p"
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
