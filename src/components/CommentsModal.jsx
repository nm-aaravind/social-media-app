import { Box, TextField, Typography, Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Send } from "@mui/icons-material";
import React, { useContext } from "react";
import Comment from "./Comment";
import { useCreateComment } from "../lib/react-query/queries";
import UserContext from "../context/userContext";
import Loader from "./Loader";
const CommentsModal = ({ postId, open, comments, setIsCommentsOpen }) => {
  const { mutateAsync: createComment, isPending: isCreatingComment } =
    useCreateComment();
  const { userDetails } = useContext(UserContext);
  const [newComment, setNewComment] = React.useState("");
  async function addComment() {
    if (newComment !== "") {
      const comment = await createComment({
        postId: postId,
        userId: userDetails.$id,
        content: newComment,
      });
      setNewComment("");
    } else {
      throw Error("Cannot create empty comment");
    }
  }
  return (
    <Box className={`${!open ? "invisible hidden opacity-0 -translate-y-12 top-1/2" : "visible block absolute opacity-100 bottom-0 right-0 left-0 top-0"} z-50 flex flex-col rounded-md transition-all bg-white`}>
    <Box
      bgcolor="white"
      className="rounded-md overflow-x-hidden overflow-y-auto"
    >
      <div className="flex justify-between items-center py-4 border-b w-full border-b-white/30">
        <Typography
          variant="p"
          component="p"
          className="pl-7 text-2xl font-varela"
          color="secondary"
        >
          Comments
        </Typography>
        <button
          onClick={() => setIsCommentsOpen((prev) => !prev)}
          className="w-10 h-10 transition-all mr-5 text-primary hover:bg-primary-light hover:text-white text-center pl-[0.1rem] rounded-full"
        >
          <CloseIcon/>
        </button>
        <Divider className="absolute w-full bottom-0"/>
      </div>
      {!comments.length && (
        <Typography
          marginTop="3rem"
          align="center"
          variant="p"
          component="p"
          color={"secondary"}
          className="sm:text-2xl md:text-4xl font-varela"
        >
          No comments yet
        </Typography>
      )}
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
      
      {isCreatingComment && (
        <div className="grid place-items-center absolute top-0 right-0 left-0 bottom-0 bg-[#404040aa]">
          <Loader />
        </div>
      )}
    </Box>
    <div className="w-full bg-white absolute bottom-0">
        <TextField
          InputProps={{
            borderRadius: 0
          }}
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          fullWidth
          placeholder="Comment"
        />
        <button
          className="absolute bg-white right-0 text-center h-full aspect-square text-primary hover:bg-primary hover:text-white transition-colors"
          onClick={addComment}
        >
          <Send fontSize="medium" className="text-inherit" />
        </button>
      </div>
    </Box>
  );
};

export default CommentsModal;
