import React, { useContext } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateUser, useSignIn } from "../../lib/react-query/queries";
import UserContext from "../../context/userContext";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    "@media (min-width: 400px)": {
      paddingTop: "50px"
    },
    height: "100%",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    width: "clamp(350px,50%,800px)",
    display: "flex",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "white",
  },
  form: {
    margin: "10px 0",
    textAlign: "center",
    padding: "2rem",
    width: "50%",
    "@media (max-width: 1200px)": {
      width: "100%",
    },
  },
  imageContainer: {
    "@media (max-width: 1200px)": {
      display: "none",
    },
    backgroundSize: "cover",
    width: "50%",
    backgroundImage: "url(/assets/auth-image.jpg)",
  },
  error: {
    width: "100%",
    color: "red",
    textAlign: "left",
  },
  heading: {
    color: palette.primary.main,
  },
  content: {
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },
}));

function SignUpForm() {
  const classes = useStyles();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { mutateAsync: signup, isPending: isCreatingUser, data, isError, error } = useCreateUser();
  console.log(isError, error)
  const { mutateAsync: signin } = useSignIn();
  const { checkAuth } = useContext(UserContext);
  const navigate = useNavigate();
  const [showToast] = useOutletContext();

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
      <Box className={classes.root}>
        <Box className={classes.formContainer}>
          <Box className={classes.form}>
            <form noValidate onSubmit={handleSubmit(formSubmit)} method="post">
              <Typography className={classes.heading} variant="h4" gutterBottom>
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
                <Typography className={classes.error}>
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
                <Typography className={classes.error}>
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
                <Typography className={classes.error}>
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
                <Typography className={classes.error}>
                  {errors.password?.message}
                </Typography>
              )}
              <Button
                disabled={isCreatingUser}
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "1.5rem", padding: "10px 0" }}
                type="submit"
              >
                Sign Up
              </Button>
              <Typography
                style={{ marginTop: "1.3rem" }}
                className={classes.content}
              >
                Already have an account? <Link to={"/signin"}>Sign In</Link>
              </Typography>
            </form>
          </Box>
          <Box className={classes.imageContainer} />
        </Box>
      </Box>
  );
}

export default SignUpForm;
