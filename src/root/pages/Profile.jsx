// import React from "react";
// import ProfileCard from "../../components/ProfileCard";
// import { makeStyles } from "@mui/styles";
// import { Box, Typography, Divider } from "@mui/material";
// import Loader from "../../components/Loader";
// import { useParams } from "react-router-dom";
// import { useGetUser, useGetUserById } from "../../lib/react-query/queries";
// import GridPostList from "../../components/GridPostList";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     width: "100%",
//     [theme.breakpoints.up("xl")]: {
//       width: "85%",
//     },
//     display: "flex",
//     flexDirection: "column",
//     gap: theme.spacing(2.5), // gap-10 equivalent
//     [theme.breakpoints.up("sm")]: {
//       paddingLeft: theme.spacing(3), // sm:px-12 equivalent
//       paddingRight: theme.spacing(3),
//     },
//     [theme.breakpoints.up("md")]: {
//       paddingLeft: theme.spacing(3.5), // md:px-14 equivalent
//       paddingRight: theme.spacing(3.5),
//     },
//   },
//   postContainer: {
//     backgroundColor: "white",
//     border: "1px solid #6a1b9a66",
//     borderRadius: "0.375rem",
//     paddingTop: theme.spacing(2.5), // pt-10 equivalent
//     paddingLeft: theme.spacing(0.5), // px-2 equivalent
//     paddingRight: theme.spacing(0.5),
//     display: "flex",
//     flexDirection: "column",
//     gap: theme.spacing(1.25), // gap-5 equivalent
//   },
//   headerContainer: {
//     paddingLeft: theme.spacing(1), // px-4 equivalent
//     paddingTop: theme.spacing(0.5), // pt-2 equivalent
//     display: "flex",
//     flexDirection: "column",
//     gap: theme.spacing(1.25), // gap-5 equivalent
//     width: "100%",
//     justifyContent: "space-between",
//     marginBottom: theme.spacing(1.5), // mb-6 equivalent
//   },
//   divider: {
//     backgroundColor: "white",
//     width: "95%",
//     alignSelf: "center",
//   },
//   postsContent: {
//     paddingLeft: theme.spacing(1), // px-4 equivalent
//     paddingRight: theme.spacing(1),
//   },
//   noPostsText: {
//     marginBottom: theme.spacing(7.5), // mb-3rem equivalent
//     textAlign: "center",
//   },
// }));

// const Profile = () => {
//   const classes = useStyles();
//   const { id } = useParams();
//   const { data: loggedInUser, isPending: isFetchingCurrentUser } = useGetUser();
//   const { data: user, isPending: isFetchingUser } = useGetUserById({
//     accountid: id,
//   });

//   React.useEffect(() => {
//     document.title = "Heyo | Profile";
//   }, []);

//   if (isFetchingCurrentUser || isFetchingUser) {
//     return <Loader message="Fetching user" />;
//   }

//   let follow_object = null;
//   for (let followers of user?.followers) {
//     if (followers.following?.$id == loggedInUser?.$id) {
//       follow_object = followers;
//       break;
//     }
//   }
//   const following = follow_object ? true : false;
//   return (
//     <Box bgcolor="primary.light" className="w-full flex justify-center px-4">
//       <Box className={classes.container}>
//         <ProfileCard
//           userToDisplay={user}
//           currentUser={loggedInUser}
//           following={following}
//           follow_object={follow_object}
//         />
//         {following && (
//           <Box className={classes.postContainer}>
//             <Box className={classes.headerContainer}>
//               <Typography
//                 paddingX={"3rem"}
//                 variant="h4"
//                 component="h3"
//                 color="secondary"
//               >
//                 Posts
//               </Typography>
//               <Divider className={classes.divider} />
//             </Box>
//             <Box className={classes.postsContent}>
//               {user?.posts.length > 0 ? (
//                 <GridPostList posts={user.posts} toDisplay="profile" />
//               ) : (
//                 <Typography
//                   className={classes.noPostsText}
//                   variant="h4"
//                   component="p"
//                   color="secondary"
//                 >
//                   No posts yet
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Profile;
import React from "react";
import ProfileCard from "../../components/ProfileCard";
import { Box, Typography, Divider } from "@mui/material";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { useGetUser, useGetUserById } from "../../lib/react-query/queries";

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
    <Box bgcolor="primary.light" className="w-full flex justify-center px-4">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          "@media (min-width: 1200px)": {
            width: "85%",
            paddingLeft: 3,
            paddingRight: 3,
          },
          "@media (min-width: 960px)": {
            paddingLeft: 3.5,
            paddingRight: 3.5,
          },
        }}
      >
        <ProfileCard
          userToDisplay={user}
          currentUser={loggedInUser}
          following={following}
          follow_object={follow_object}
        />
        {following && (
          <Box
            sx={{
              backgroundColor: "white",
              border: "1px solid #6a1b9a66",
              borderRadius: "0.375rem",
              paddingTop: 2.5,
              paddingLeft: 0.5,
              paddingRight: 0.5,
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
            }}
          >
            <Box
              sx={{
                paddingLeft: 1,
                paddingTop: 0.5,
                display: "flex",
                flexDirection: "column",
                gap: 1.25,
                width: "100%",
                justifyContent: "space-between",
                marginBottom: 1.5,
              }}
            >
              <Typography
                paddingX={"3rem"}
                variant="h4"
                component="h3"
                color="secondary"
              >
                Posts
              </Typography>
              <Divider
                sx={{
                  backgroundColor: "white",
                  width: "95%",
                  alignSelf: "center",
                }}
              />
            </Box>
            <Box
              sx={{
                paddingLeft: 1,
                paddingRight: 1,
              }}
            >
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
