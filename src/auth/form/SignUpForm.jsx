import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateUser, useSignIn } from "../../lib/react-query/queries";
import UserContext from "../../context/userContext";

function SignUpForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { mutateAsync: signup, isPending: isCreatingUser, data, isError, error } = useCreateUser();
  const { mutateAsync: signin } = useSignIn();
  const { checkAuth, showToast } = useContext(UserContext);
  const navigate = useNavigate();

  async function formSubmit(data) {
    try {
      const newUser = await signup(data);
      if (!newUser) {
        throw Error("Cannot sign up");
      }
      const session = await signin({
        email: newUser.email,
        password: data.password,
      });
      if (!session) {
        console.log("Cannot create session");
        throw Error;
      }
      if (checkAuth()) {
        reset();
        showToast("success", "Signed up successfully!");
        navigate("/");
      }
    } catch (error) {
      if (error.type == 'general_argument_invalid'){
        showToast('error', 'Password should be between 8 to 256 characters')
      }
      console.log(error);
      throw error;
    }
  }

  return (
      <Box
        sx={{
          "@media (min-width: 400px)": { paddingTop: "50px" },
          height: "100%",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            width: "clamp(350px,50%,800px)",
            display: "flex",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              margin: "10px 0",
              textAlign: "center",
              padding: "2rem",
              width: "50%",
              "@media (max-width: 1200px)": { width: "100%" },
            }}
          >
            <form noValidate onSubmit={handleSubmit(formSubmit)} method="post">
              <Typography
                sx={{ color: (theme) => theme.palette.primary.main }}
                variant="h4"
                gutterBottom
              >
                Sign Up
              </Typography>

              <TextField
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name required",
                  },
                  maxLength: {
                    value: 70,
                    message: "70 characters max",
                  },
                })}
                name="name"
                id="name"
                label="Name"
                autoComplete="off"
                variant="outlined"
                fullWidth
                autoFocus
                margin="normal"
              />
              {errors?.name && (
                <Typography
                  sx={{ width: "100%", color: "red", textAlign: "left" }}
                >
                  {errors?.name?.message}
                </Typography>
              )}

              <TextField
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username required",
                  },
                  maxLength: {
                    value: 30,
                    message: "30 characters max",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]*$/,
                    message: "Use only alphabets, numbers and underscores",
                  },
                })}
                name="username"
                id="username"
                label="Username"
                autoComplete="off"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              {errors.username && (
                <Typography
                  sx={{ width: "100%", color: "red", textAlign: "left" }}
                >
                  {errors.username?.message}
                </Typography>
              )}

              <TextField
                {...register("email", {
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email id",
                  },
                  required: {
                    value: true,
                    message: "Email required",
                  },
                })}
                name="email"
                label="Email"
                autoComplete="off"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              {errors.email && (
                <Typography
                  sx={{ width: "100%", color: "red", textAlign: "left" }}
                >
                  {errors.email?.message}
                </Typography>
              )}

              <TextField
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                name="password"
                autoComplete="off"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              {errors.password && (
                <Typography
                  sx={{ width: "100%", color: "red", textAlign: "left" }}
                >
                  {errors.password?.message}
                </Typography>
              )}

              <Button
                disabled={isCreatingUser}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "1.5rem", padding: "10px 0" }}
                type="submit"
              >
                Sign Up
              </Button>

              <Typography
                sx={{
                  marginTop: "1.3rem",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                Already have an account? <Link to={"/signin"}>Sign In</Link>
              </Typography>
            </form>
          </Box>

          <Box
            sx={{
              "@media (max-width: 1200px)": { display: "none" },
              backgroundSize: "cover",
              width: "50%",
              backgroundImage: "url(/assets/auth-image.jpg)",
            }}
          />
        </Box>
      </Box>
  );
}

export default SignUpForm;
