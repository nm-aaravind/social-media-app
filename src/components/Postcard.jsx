import React from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { MoreVertSharp } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useDeletePost } from '../lib/react-query/queries';
import PostStats from './PostStats';
import Loader from './Loader';
import CommentsModal from './CommentsModal';

function Postcard({ post, saves, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isCommentsOpen, setIsCommentsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();
  const open = Boolean(anchorEl);

  const handleDropDown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropDownClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'primary.mainLight',
        width: '100%',
        maxWidth: '30rem',
        height: 'auto',
        overflow: 'hidden',
        boxShadow: '0 5px 5px #6a1b9a66',
        borderRadius: '0.375rem',
        position: 'relative',
        '@media (max-width: 960px)': {
          maxWidth: '40rem',
        },
        '@media (max-width: 600px)': {
          maxWidth: '100%',
        },
      }}
    >
      <Box
        sx={{
          borderBottom: '1px solid #fff2',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link
          to={`/profile/${post.user?.accountid}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src={post.user?.profileimageurl}
            alt="profile"
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              marginRight: '1rem',
              '@media (max-width: 960px)': {
                width: '3rem',
                height: '3rem',
              },
              '@media (max-width: 600px)': {
                width: '2.5rem',
                height: '2.5rem',
              },
            }}
          />
          <p
            style={{
              fontSize: '1.5rem',
              color: 'white',
              fontWeight: 600,
              '@media (max-width: 960px)': {
                fontSize: '1.2rem',
              },
              '@media (max-width: 600px)': {
                fontSize: '1rem',
              },
            }}
          >
            {post.user?.username}
          </p>
        </Link>
        {user?.accountid === post.user?.accountid && (
          <button
            onClick={handleDropDown}
            style={{
              padding: '0.2rem',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              transition: '0.1s ease',
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
          >
            <MoreVertSharp fontSize="large" color="primary" />
          </button>
        )}
        <Menu
          PaperProps={{
            sx: {
              backgroundColor: 'primary.main',
              marginTop: '1.2rem',
              border: '3px solid #ebebeb33',
              color: '#ebebeb',
              borderRadius: 0,
              minWidth: '200px',
              boxShadow: '0px 10px 5px rgba(0,0,0,0.6)',
            },
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleDropDownClose}
        >
          <MenuItem
            sx={{
              '&:hover': {
                backgroundColor: 'light',
              },
              fontSize: '1rem',
              height: '4rem',
            }}
            onClick={() => {
              navigate(`update-post/${post.$id}`);
              handleDropDownClose();
            }}
          >
            Update Post
          </MenuItem>
          <MenuItem
            sx={{
              color: '#f73123',
              '&:hover': {
                backgroundColor: 'light',
              },
              fontSize: '1rem',
              height: '4rem',
            }}
            onClick={() => {
              handleDropDownClose();
              deletePost({ postId: post.$id, imageId: post.imageId });
            }}
          >
            Delete Post
          </MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '30rem',
          backgroundColor: '#607d8b',
          overflow: 'hidden',
          '@media (max-width: 960px)': {
            height: '33rem',
          },
          '@media (max-width: 600px)': {
            height: '26rem',
          },
        }}
      >
        <img
          src={post.image}
          alt="post"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <PostStats
        setIsCommentsOpen={setIsCommentsOpen}
        post={post}
        userId={user?.$id}
        saves={saves}
      />
      {isDeleting && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(112, 112, 112, 0.73)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Loader message="Deleting" />
        </Box>
      )}
      <CommentsModal
        postId={post.$id}
        setIsCommentsOpen={setIsCommentsOpen}
        open={isCommentsOpen}
        comments={post.comments.reverse()}
      />
    </Box>
  );
}

export default Postcard;

// import React from 'react';
// import { Box, Menu, MenuItem } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { MoreVertSharp } from '@mui/icons-material';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDeletePost } from '../lib/react-query/queries'
// import PostStats from './PostStats'
// import Loader from './Loader'
// import CommentsModal from './CommentsModal'

// const useStyles = makeStyles((theme) => ({
//   postcardContainer: {
//     backgroundColor: theme.palette.primary.mainLight,
//     width: '100%',
//     maxWidth: '30rem',
//     height: 'auto',
//     overflow: 'hidden',
//     boxShadow: '0 5px 5px #6a1b9a66',
//     borderRadius: "0.375rem",
//     position: 'relative',
//     [theme.breakpoints.down('md')]: {
//       maxWidth: '40rem',
//     },
//     [theme.breakpoints.down('sm')]: {
//       maxWidth: '100%',
//     },
//   },
//   header: {
//     borderBottom: '1px solid #fff2',
//     padding: '1rem 1rem',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   profileLink: {
//     display: 'flex',
//     alignItems: 'center',
//     textDecoration: 'none',
//   },
//   profileImage: {
//     width: '3rem',
//     height: '3rem',
//     borderRadius: '50%',
//     marginRight: '1rem',
//     [theme.breakpoints.down('md')]: {
//       width: '3rem',
//       height: '3rem',
//     },
//     [theme.breakpoints.down('sm')]: {
//       width: '2.5rem',
//       height: '2.5rem',
//     },
//   },
//   username: {
//     fontSize: '1.5rem',
//     color: 'white',
//     fontWeight: 600,
//     [theme.breakpoints.down('md')]: {
//       fontSize: '1.2rem',
//     },
//     [theme.breakpoints.down('sm')]: {
//       fontSize: '1rem',
//     },
//   },
//   postImageContainer: {
//     width: '100%',
//     height: '30rem',
//     backgroundColor: '#607d8b',
//     overflow: 'hidden',
//     [theme.breakpoints.down('md')]: {
//       height: '33rem',
//     },
//     [theme.breakpoints.down('sm')]: {
//       height: '26rem',
//     },
//   },
//   postImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
//   moreButton: {
//     padding: '0.2rem',
//     borderRadius: '50%',
//     '&:hover': {
//       backgroundColor: theme.palette.primary.light,
//     },
//     transition: '0.1s ease'
//   },
//   menuPaper: {
//     backgroundColor: theme.palette.primary.main,
//     marginTop: '1.2rem',
//     border: '3px solid #ebebeb33',
//     color: '#ebebeb',
//     borderRadius: '0px',
//     minWidth: '200px',
//     boxShadow: '0px 10px 5px rgba(0,0,0,0.6)',
//   },
//   menuItem: {
//     '&:hover': {
//       backgroundColor: theme.palette.light,
//     },
//     fontSize: '1rem',
//     height: '4rem',
//   },
//   deleteItem: {
//     color: '#f73123',
//   },
//   loaderOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(112, 112, 112, 0.73)',
//     display: 'grid',
//     placeItems: 'center',
//   },
// }));

// function Postcard({ post, saves, user }) {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [isCommentsOpen, setIsCommentsOpen] = React.useState(false);
//   const navigate = useNavigate();
//   const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();
//   const open = Boolean(anchorEl);

//   const handleDropDown = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleDropDownClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box className={classes.postcardContainer}>
//       <Box className={classes.header}>
//         <Link to={`/profile/${post.user?.accountid}`} className={classes.profileLink}>
//           <img src={post.user?.profileimageurl} alt="profile" className={classes.profileImage} />
//           <p className={classes.username}>{post.user?.username}</p>
//         </Link>
//         {user?.accountid === post.user?.accountid && (
//           <button onClick={handleDropDown} className={classes.moreButton}>
//             <MoreVertSharp fontSize="large" color="primary" />
//           </button>
//         )}
//         <Menu
//           PaperProps={{
//             className: classes.menuPaper,
//           }}
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleDropDownClose}
//         >
//           <MenuItem
//             className={classes.menuItem}
//             onClick={() => {
//               navigate(`update-post/${post.$id}`);
//               handleDropDownClose();
//             }}
//           >
//             Update Post
//           </MenuItem>
//           <MenuItem
//             className={`${classes.menuItem} ${classes.deleteItem}`}
//             onClick={() => {
//               handleDropDownClose();
//               deletePost({ postId: post.$id, imageId: post.imageId });
//             }}
//           >
//             Delete Post
//           </MenuItem>
//         </Menu>
//       </Box>
//       <div className={classes.postImageContainer}>
//         <img src={post.image} alt="post" className={classes.postImage} />
//       </div>
//       <PostStats setIsCommentsOpen={setIsCommentsOpen} post={post} userId={user?.$id} saves={saves} />
//       {isDeleting && (
//         <div className={classes.loaderOverlay}>
//           <Loader message="Deleting" />
//         </div>
//       )}
//       <CommentsModal postId={post.$id} setIsCommentsOpen={setIsCommentsOpen} open={isCommentsOpen} comments={post.comments.reverse()} />
//     </Box>
//   );
// }

// export default Postcard;

// import { Menu, MenuItem } from '@mui/material'
// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDeletePost } from '../lib/react-query/queries'
// import { Box } from '@mui/material'
// import { MoreVertSharp } from '@mui/icons-material'
// import styled from 'styled-components'
// import PostStats from './PostStats'
// import Loader from './Loader'
// import CommentsModal from './CommentsModal'


// const Listbox = styled('ul')(
//     ({ theme }) => `
//     font-family: 'Varela', sans-serif;
//     font-size: 1rem;
//     box-sizing: border-box;
//     min-width: 200px;
//     border-radius: 0px;
//     overflow: auto;
//     box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(255,255,255, 1)'
//         };
//     z-index: 1;
//     `,
// );

// function Postcard({ post, saves, user }) {
//     const [anchorEl, setAnchorEl] = React.useState(null)
//     const [isCommentsOpen, setIsCommentsOpen] = React.useState(false)
//     const navigate = useNavigate()
//     const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost()
//     const open = Boolean(anchorEl)
//     const handleDropDown = (event) => {
//         setAnchorEl(event.currentTarget)
//     }
//     const handleDropDownClose = () => {
//         setAnchorEl(null)
//     }
//     return (
//         <Box bgcolor='primary.light' border='1px solid #fff2' className='lg:w-[45rem] lg:h-[54rem] md:w-[40rem] md:h-[48rem] sm:w-full overflow-hidden drop-shadow-form'>
//             <Box borderBottom='1px solid #fff2' className='header w-full sm:h-20 md:h-24 lg:h-28 flex justify-between items-center'>
//                 <Link to={`/profile/${post.user?.$id}`} className='float-left flex items-center'>
//                     <img src={post.user?.profileimageurl} className='sm:w-12 md:w-14 lg:w-14 ml-9 mr-7'></img>
//                     <p className='sm:text-xl md:text-2xl font-varela text-white -ml-3'>{post.user?.username}</p>
//                 </Link>
//                 {
//                     user?.accountid === post.user?.accountid && <button onClick={handleDropDown} className='mr-6 rounded-full p-2 hover:bg-[#333] transition-all'>
//                         <MoreVertSharp fontSize='large' color='secondary' />
//                     </button>
//                 }
//                 <Menu PaperProps={{
//                     style: {
//                         backgroundColor: '#232323', // Set your desired grey background color here
//                         marginTop: '1.2rem',
//                         border: '3px solid #ebebeb33',
//                         color: '#ebebeb',
//                         borderRadius: '0px',
//                         minWidth: '200px',
//                         boxShadow: '0px 10px 5px rgba(0,0,0,0.6)'
//                     },
//                 }} anchorEl={anchorEl} open={open} onClose={handleDropDownClose} slots={{ listbox: Listbox }}>
//                     <MenuItem sx={{ '&:hover': { backgroundColor: '#333' }, fontSize: '1.4rem', height: '4rem' }} onClick={() => {
//                         navigate(`update-post/${post.$id}`)
//                         handleDropDownClose()
//                     }}><p className='text-center  w-full'>Update Post</p></MenuItem>
//                     <MenuItem onClick={() => {
//                         handleDropDownClose()
//                         deletePost({ postId: post.$id, imageId: post.imageId });
//                     }} sx={{ '&:hover': { backgroundColor: '#333' }, fontSize: '1.4rem', color: '#f73123', height: '4rem' }} ><p className='text-center w-full'>Delete Post</p></MenuItem>
//                 </Menu>
//             </Box>
//             <div className='w-full overflow-hidden object-fill sm:h-[26rem] md:h-[33rem] lg:h-[36rem] bg-slate-600'>
//                 <img src={post.image} className='h-full w-full'></img>
//             </div>
//             <PostStats setIsCommentsOpen={setIsCommentsOpen} post={post} userId={user?.$id} saves={saves} />
//             {
//                 isDeleting && <div className='absolute grid place-self-center top-0 w-full h-full bg-[#707070bb]'>
//                     <Loader message="Deleting" />
//                 </div>
//             }
//             <CommentsModal postId={post.$id} setIsCommentsOpen={setIsCommentsOpen} open={isCommentsOpen} comments={post.comments.reverse()} />
//         </Box>
//     )
// }

// export default Postcard