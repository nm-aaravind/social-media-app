import { Edit, PersonAdd, PersonRemove } from "@mui/icons-material";
import { Box, Typography, Button, Divider, useRadioGroup } from "@mui/material";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useAddFollower, useRemoveFollower } from "../lib/react-query/queries";
const ProfileCard = ({ userToDisplay, currentUser }) => {
  const { mutateAsync: addFollower, isPending: isAddingFollower } = useAddFollower()
  const [showToast] = useOutletContext()
  const { mutateAsync: removeFollower, isPending: isRemovingFollower } = useRemoveFollower()
  let follow_object = null;
  console.log(userToDisplay, currentUser)
  for (let followers of userToDisplay.followers) {
    console.log(followers.following?.$id, currentUser?.$id);
    if (followers.following?.$id == currentUser?.$id) {
      follow_object = followers;
      break;
    }
  }
  async function addFollowerHandler(){
    try {
      const follow = await addFollower({ toFollowId: userToDisplay.$id  , followingId: currentUser.$id })
      if(!follow){
        throw Error('Cannot follow')
      }
      showToast("success", "Followed")
    } catch (error) {
      showToast("error", `Error: ${error.message}`)
      throw error
    }
  }
  async function removeFollowerHandler(){
    try {
      const {status} = await removeFollower(follow_object.$id);
      if(status != 'ok') throw Error("Cannot unfollow")
      showToast("success", "Unfollowed")
  } catch (error) {
      showToast("error", `Error: ${error.message}`)
      throw error
    }
  }
  const following = follow_object ? true : false
  return (
    <Box
      boxShadow="0px 5px 5px rgba(0,0,0,0.5)"
      className="drop-shadow-3xl lg:w-[75%]"
      bgcolor="primary.light"
      width="100%"
    >
      <div className="flex flex-col flex-wrap p-20 gap-10 w-full">
        <div className="flex gap-16 flex-wrap sm:justify-center sm:gap-10 md:justify-normal lg:gap-12">
          <img
            className="lg:w-40 xs:w-20 md:w-36"
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
              color="secondary.light"
              variant="h4"
              component="p"
            >
              @{userToDisplay.username}
            </Typography>
            <div className="flex gap-10 mt-4">
              <Link to={"followers"} className="p-1">
                <Typography
                  variant="p"
                  component="p"
                  className="text-white font-varela sm:text-2xl md:text-3xl"
                >
                  {userToDisplay.followers.length} followers
                </Typography>
              </Link>
              <Link to={"followers"} className="p-1">
                <Typography
                  variant="p"
                  component="p"
                  className="text-white font-varela sm:text-2xl md:text-3xl"
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
            {/* <Typography variant='h3' component='p' color='secondary'>Bio</Typography> */}
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
        {userToDisplay.$id === currentUser.$id ? (
          <Link
            className="w-full"
            to={`/update-profile/${userToDisplay.accountid}`}
          >
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                fontSize: "18px",
                height: "49px",
                borderRadius: 0,
                width: "100%",
                boxShadow: "0px 5px 5px rgba(0,0,0,0.5)",
                ":hover": {
                  backgroundColor: "info.main",
                  border: "lightsalmon",
                  color: "white",
                },
              }}
              className="drop-shadow-form-field glex gap-3"
            >
              <Edit className="mb-1" />
              <Typography variant="h6">EDIT PROFILE</Typography>
            </Button>
          </Link>
        ) : following ? (
          <Button
            onClick={removeFollowerHandler}
            variant="outlined"
            color="secondary"
            sx={{
              fontSize: "18px",
              height: "50px",
              borderRadius: 0,
              width: "100%",
              boxShadow: "0px 5px 5px rgba(0,0,0,0.5)",
              ":hover": {
                backgroundColor: "red",
                border: "red",
                color: "white",
              },
            }}
            className="drop-shadow-form-field flex gap-3"
          >
            <PersonRemove className="mb-1" />
            <Typography className="self-center" variant="h6">
              Unfollow
            </Typography>
          </Button>
        ):<Button
        variant="outlined"
        color="secondary"
        sx={{
          fontSize: "18px",
          height: "50px",
          borderRadius: 0,
          width: "100%",
          boxShadow: "0px 5px 5px rgba(0,0,0,0.5)",
          ":hover": {
            backgroundColor: "info.main",
            border: "lightsalmon",
            color: "white",
          },
        }}
        className="drop-shadow-form-field flex gap-3"
        onClick={addFollowerHandler}
        disabled={isAddingFollower}
      >
        <PersonAdd className="mb-1" />
        <Typography className="self-center" variant="h6">
            Follow
        </Typography>
      </Button>}
      </div>
    </Box>
  );
};

export default ProfileCard;
