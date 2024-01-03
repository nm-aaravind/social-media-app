import React, { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Paper, Typography, Button, TextField } from "@mui/material";
import { useUpdateProfile } from "../lib/react-query/queries";
import ProfileImageUploader from "./ProfileImageUploader";
import UserContext from "../context/userContext";
import Loader from "./Loader";
const ProfileForm = ({ user }) => {
  const { updateContext } = useContext(UserContext);
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
  const [showToast] = useOutletContext()

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
      console.log(updatedProfile, "After updatings");
      updateContext(updatedProfile);
      showToast('success', "Updated profile successfully !")
      return navigate(`/profile/${user.accountid}`);
    } catch (error) {
      showToast("error", `Error: ${error.message}`)
      throw error
    }
  }
  return isPending ? (
    <Loader message="Updating profile" />
  ) : (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(formSubmit)}
        className="sm:px-6 flex flex-col gap-5 mb-16"
      >
        <ProfileImageUploader
          name="file"
          image={image}
          setImage={setImage}
          user_name={user.name}
          currImage={user.profileimageid}
        />

        <div className="flex flex-col gap-3 m-4">
          <Paper
            className="drop-shadow-form"
            square
            sx={{
              backgroundColor: "primary.light",
              ":focus-within": {
                border: "1px solid #ebe8e888",
              },
              border: "1px solid #fff2",
            }}
          >
            <Typography
              borderBottom={"1px solid #fff2"}
              padding={"0.75rem"}
              align="center"
              variant="p"
              component={"p"}
              color="secondary.main"
              fontFamily={"Varela Round"}
              className="sm:text-2xl md:text-3xl"
            >
              Name
            </Typography>
            <TextField
              sx={{ border: 0, outline: 0 }}
              className="focus:bg-white focus-within:border-transparent focus-within:outline-none"
              {...methods.register("name", {
                max: {
                  value: 70,
                  message: "70 characters max",
                },
              })}
              name="name"
              id="name"
              variant="outlined"
              fullWidth
              InputProps={{
                sx: { fontSize: 22, borderRadius: 0, color: "white" },
              }}
            />
          </Paper>
        </div>
        <div className="flex flex-col gap-3 m-4">
          <Paper
            className="drop-shadow-form"
            square
            sx={{
              backgroundColor: "primary.light",
              ":focus-within": {
                border: "1px solid #ebe8e888",
              },
              border: "1px solid #fff2",
            }}
          >
            <Typography
              borderBottom={"1px solid #fff2"}
              padding={"0.75rem"}
              align="center"
              variant="p"
              fontFamily={"Varela Round"}
              className="sm:text-2xl md:text-3xl"
              component={"p"}
              color="secondary.main"
            >
              Username
            </Typography>
            <TextField
              {...methods.register("username", {
                max: {
                  value: 30,
                  message: "30 characters max",
                },
              })}
              name="username"
              id="username"
              variant="outlined"
              fullWidth
              InputProps={{
                sx: { fontSize: 22, borderRadius: 0, color: "white" },
              }}
            />
          </Paper>
        </div>
        <div className="flex flex-col gap-3 m-4">
          <Paper
            className="drop-shadow-form"
            square
            sx={{
              backgroundColor: "primary.light",
              ":focus-within": {
                border: "1px solid #ebe8e888",
              },
              border: "1px solid #fff2",
            }}
          >
            <Typography
              borderBottom={"1px solid #fff2"}
              padding={"0.75rem"}
              align="center"
              variant="p"
              component={"p"}
              fontFamily={"Varela Round"}
              className="sm:text-2xl md:text-3xl"
              color="secondary.main"
            >
              Bio
            </Typography>
            <TextField
              rows={2}
              {...methods.register("bio", {
                max: {
                  value: 2200,
                  message: "Max 2200 characters allowed",
                },
              })}
              name="bio"
              id="bio"
              variant="outlined"
              fullWidth
              InputProps={{
                sx: { fontSize: 22, borderRadius: 0, color: "white" },
              }}
              multiline
            />
          </Paper>
        </div>
        <div className="w-full flex gap-10 self-end p-4 mt-2 mb-14">
          <Button
            color="secondary"
            variant="outlined"
            sx={{
              height: "4rem",
              width: "100%",
              border: "1px solid #ebe8e888",
              fontSize: "22px",
              borderRadius: 0,
              boxShadow: "0px 5px 5px rgba(0,0,0,0.5)",
              color: "#ebe8e888",
              ":hover": {
                backgroundColor: "red",
                border: "red",
                color: "#ebe8e8",
              },
            }}
            className="drop-shadow-form-field"
            onClick={() => navigate(-1)}
          >
            Discard
          </Button>

          <Button
            type="submit"
            sx={{
              height: "4rem",
              width: "100%",
              border: "1px solid #ebe8e888",
              fontSize: "22px",
              borderRadius: 0,
              boxShadow: "0px 5px 5px rgba(0,0,0,0.5)",
              color: "#ebe8e888",
              ":hover": {
                backgroundColor: "green",
                border: "green",
                color: "#ebe8e8",
              },
            }}
            className="drop-shadow-form-field"
            disabled={image === ""}
            color="secondary"
          >
            Update
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileForm;
