// import React, { useContext, useEffect } from "react";
// import { makeStyles } from "@mui/styles";

// import { Link, redirect, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useSignIn } from "../../lib/react-query/queries";
// import { useOutletContext } from "react-router-dom";
// import { Button, Typography, Box, TextField } from "@mui/material";
// import UserContext from "../../context/userContext";

// const useStyles = makeStyles(({ palette }) => ({
//   root: {
//     height: "100%",
//     display: "flex",
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   formContainer: {
//     width: "clamp(350px,50%,800px)",
//     display: "flex",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     borderRadius: "10px",
//     overflow: "hidden",
//     backgroundColor: "white",
//   },
//   form: {
//     margin: "10px 0",
//     textAlign: "center",
//     padding: "2rem",
//     width: "50%",
//     "@media (max-width: 1200px)": {
//       width: "100%",
//     },
//   },
//   imageContainer: {
//     "@media (max-width: 1200px)": {
//       display: "none",
//     },
//     backgroundSize: "cover",
//     width: "50%",
//     backgroundImage: "url(/assets/auth-image.jpg)",
//   },
//   error: {
//     width: "100%",
//     color: "red",
//     textAlign: "left",
//   },
//   heading: {
//     color: palette.primary.main,
//   },
//   content: {
//     textDecoration: "underline",
//     textUnderlineOffset: "2px",
//   },
// }));

// function SignInForm() {
//   const classes = useStyles();
//   const [showToast] = useOutletContext();
//   const navigate = useNavigate()
//   const { register, handleSubmit, formState, reset } = useForm();
//   const { errors } = formState;
//   const { mutateAsync: signin, isPending: isSigningIn } = useSignIn();
//   const { checkAuth } = useContext(UserContext);

//   async function formSubmit(data) {
//     try {
//       const session = await signin({
//         email: data.email,
//         password: data.password,
//       });
//       console.log(session, "session");
//       if (!session) {
//         console.log("Cannot create session");
//         throw Error;
//       }
//       if (checkAuth()) {
//         showToast("success", "Signed in successfully");
//         reset();
//         navigate("/");
//       }
//     } catch (error) {
//       showToast("error", error.message);
//       throw Error;
//     }
//   }
//   return (
//     <Box className={classes.root}>
//       <Box className={classes.formContainer}>
//         <Box className={classes.form}>
//           <form noValidate onSubmit={handleSubmit(formSubmit)} method="post">
//             <Typography className={classes.heading} variant="h4" gutterBottom>
//               Sign In
//             </Typography>
//             <TextField
//               {...register("email", {
//                 pattern: {
//                   value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//                   message: "Enter a valid email id",
//                 },
//                 required: {
//                   value: true,
//                   message: "Email required",
//                 },
//               })}
//               name="email"
//               id="outlined-basic"
//               label="Email"
//               autoComplete="off"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
//             {errors.email && (
//               <Typography className={classes.error}>
//                 {errors.email?.message}
//               </Typography>
//             )}
//             <TextField
//               {...register("password", {
//                 required: {
//                   value: true,
//                   message: "Password is required",
//                 },
//               })}
//               name="password"
//               autoComplete="off"
//               label="Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
//             {errors.password && (
//               <Typography className={classes.error}>
//                 {errors.password?.message}
//               </Typography>
//             )}
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               style={{ marginTop: "1.5rem", padding: "10px 0" }}
//               type="submit"
//             >
//               Sign In
//             </Button>
//             <Typography
//               style={{ marginTop: "1.3rem" }}
//               className={classes.content}
//             >
//               New user? <Link to={"/signup"}>Sign Up</Link>
//             </Typography>
//           </form>
//         </Box>
//         <Box className={classes.imageContainer} />
//       </Box>
//     </Box>
//   );
// }

// export default SignInForm;
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignIn } from "../../lib/react-query/queries";
import { useOutletContext } from "react-router-dom";
import { Button, Typography, Box, TextField } from "@mui/material";
import UserContext from "../../context/userContext";

function SignInForm() {
  const [showToast] = useOutletContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { mutateAsync: signin } = useSignIn();
  const { checkAuth } = useContext(UserContext);

  async function formSubmit(data) {
    try {
      const session = await signin({
        email: data.email,
        password: data.password,
      });
      if (!session) {
        throw new Error("Cannot create session");
      }
      if (checkAuth()) {
        showToast("success", "Signed in successfully");
        reset();
        navigate("/");
      }
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <Box
      sx={{
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
            "@media (max-width: 1200px)": {
              width: "100%",
            },
          }}
        >
          <form noValidate onSubmit={handleSubmit(formSubmit)} method="post">
            <Typography
              sx={{ color: "primary.main" }}
              variant="h4"
              gutterBottom
            >
              Sign In
            </Typography>
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
              id="outlined-basic"
              label="Email"
              autoComplete="off"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {errors.email && (
              <Typography sx={{ width: "100%", color: "red", textAlign: "left" }}>
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
              <Typography sx={{ width: "100%", color: "red", textAlign: "left" }}>
                {errors.password?.message}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "1.5rem", padding: "10px 0" }}
              type="submit"
            >
              Sign In
            </Button>
            <Typography sx={{ marginTop: "1.3rem", textDecoration: "underline", textUnderlineOffset: "2px" }}>
              New user? <Link to={"/signup"}>Sign Up</Link>
            </Typography>
          </form>
        </Box>
        <Box
          sx={{
            "@media (max-width: 1200px)": {
              display: "none",
            },
            backgroundSize: "cover",
            width: "50%",
            backgroundImage: "url(/assets/auth-image.jpg)",
          }}
        />
      </Box>
    </Box>
  );
}

export default SignInForm;
