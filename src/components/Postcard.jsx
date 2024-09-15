import React from "react";
import { Box } from "@mui/material";
import { MoreVertSharp } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useDeletePost } from "../lib/react-query/queries";
import PostStats from "./PostStats";
import Loader from "./Loader";
import CommentsModal from "./CommentsModal";
import Dropdown from "./Dropdown";

function Postcard({ post, saves, user }) {
  const [isCommentsOpen, setIsCommentsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();

  return (
    <Box
      sx={{
        backgroundColor: "primary.mainLight",
        width: "100%",
        maxWidth: "30rem",
        height: "auto",
        boxShadow: "0 5px 5px #6a1b9a66",
        borderRadius: "0.375rem",
        position: "relative",
        "@media (max-width: 960px)": {
          maxWidth: "40rem",
        },
        "@media (max-width: 600px)": {
          maxWidth: "100%",
        },
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #fff2",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to={`/profile/${post.user?.accountid}`}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src={post.user?.profileimageurl}
            alt="profile"
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              marginRight: "1rem",
              "@media (max-width: 960px)": {
                width: "3rem",
                height: "3rem",
              },
              "@media (max-width: 600px)": {
                width: "2.5rem",
                height: "2.5rem",
              },
            }}
          />
          <p
            style={{
              fontSize: "1.5rem",
              color: "white",
              fontWeight: 600,
              "@media (max-width: 960px)": {
                fontSize: "1.2rem",
              },
              "@media (max-width: 600px)": {
                fontSize: "1rem",
              },
            }}
          >
            {post.user?.username}
          </p>
        </Link>
        {user?.accountid === post.user?.accountid && (
          <div className="absolute top-6 right-10 z-50">
            <Dropdown
              content={[
                {
                  value: "Update Post",
                  action: navigate,
                  arg: `update-post/${post.$id}`,
                },
                {
                  value: "Delete",
                  action: deletePost,
                  arg: { postId: post.$id, imageId: post.imageId },
                },
              ]}
            >
              <MoreVertSharp fontSize="medium" color="primary" />
            </Dropdown>
          </div>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "30rem",
          backgroundColor: "#607d8b",
          "@media (max-width: 960px)": {
            height: "33rem",
          },
          "@media (max-width: 600px)": {
            height: "26rem",
          },
        }}
      >
        <Link to={`/posts/${post.$id}`}>
        <img
          src={post.image}
          alt="post"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        </Link>
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
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(112, 112, 112, 0.73)",
            display: "grid",
            placeItems: "center",
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
