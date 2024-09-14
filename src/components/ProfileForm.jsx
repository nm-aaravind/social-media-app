import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Paper, Typography, Button, TextField, Box, Grid, Divider } from "@mui/material";
import { useUpdateProfile } from "../lib/react-query/queries";
import ProfileImageUploader from "./ProfileImageUploader";
import UserContext from "../context/userContext";
import Loader from "./Loader";

const ProfileForm = ({ user }) => {
  const { updateContext, showToast } = useContext(UserContext);
  const [image, setImage] = React.useState(user.profileimageurl);
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      name: user ? user?.name : "",
      username: user ? user?.username : "",
      bio: user ? user?.bio : "",
      file: [],
    },
  });
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  async function formSubmit(data) {
    try {
      const updatedProfile = await updateProfile({
        userId: user.$id,
        ...data,
        image,
        currImage: user.profileimageid,
      });
      if (!updatedProfile) {
        throw Error("Cannot update profile");
      }
      updateContext(updatedProfile);
      showToast("success", "Updated profile successfully!");
      return navigate(`/profile/${user.accountid}`);
    } catch (error) {
      showToast("error", `Error: ${error.message}`);
      throw error;
    }
  }

  return isPending ? (
    <Loader message="Updating profile" />
  ) : (
    <FormProvider {...methods}>
      <Box
        className="sm:w-full md:w-3/5 sm:mt-28 md:mt-2 m-auto"
        component="form"
        onSubmit={methods.handleSubmit(formSubmit)}
      >
        <Box className="grid sm:grid-cols-1 md:grid-cols-2 px-5 sm:gap-3 md:gap-4">
          <Typography
            className="sm:text-3xl md:text-4xl col-start-1 col-end-3 font-varela"
            variant="p"
          >
            Edit Profile
          </Typography>
            <Divider className="col-start-1 col-end-3" />
          <div className="col-start-1 col-end-3">
          <ProfileImageUploader
            name="file"
            image={image}
            setImage={setImage}
            user_name={user.name}
            currImage={user.profileimageid}
          />
          </div>
          <TextField
            {...methods.register("name", {
              max: {
                value: 70,
                message: "70 characters max",
              },
            })}
            name="name"
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            className="sm:col-start-1 sm:col-end-3 md:col-end-2"
          />

          <TextField
            {...methods.register("username", {
              max: {
                value: 30,
                message: "30 characters max",
              },
            })}
            name="username"
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            {...methods.register("bio", {
              max: {
                value: 2200,
                message: "Max 2200 characters allowed",
              },
            })}
            name="bio"
            id="bio"
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
            className="col-start-1 col-end-3"
          />
          <Box className="flex col-start-1 col-end-3 gap-3 justify-end py-5">
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Discard
            </Button>

            <Button
              type="submit"
              disabled={image === ""}
              color="primary"
              variant="contained"
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default ProfileForm;
