import {
  Box,
  Typography,
  unstable_createMuiStrictModeTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext } from "react";
import Comment from "./Comment";
import SearchBar from "./SearchBar";
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
        userId: userDetails.accountid,
        content: newComment,
      });
      setNewComment('')
    } else {
      throw Error("Cannot create empty comment");
    }
  }
  if (!open) return null;
  return (
    <Box
      bgcolor="primary.light"
      className="top-0 right-0 left-0 bottom-0 absolute flex flex-col overflow-auto scrollbar-invisible"
    >
      <div className="min-h-[5rem] flex justify-between items-center border-b border-b-white/30">
        <Typography
          variant="p"
          component="p"
          fontFamily={"Varela Round"}
          className="pl-7 text-3xl"
          color="secondary"
        >
          Comments
        </Typography>
        <button
          onClick={() => setIsCommentsOpen((prev) => !prev)}
          className="w-10 h-10 transition-all mr-5 hover:bg-[#404040] text-center pl-[0.1rem] rounded-full noSelect"
        >
          <CloseIcon className="text-white" />
        </button>
      </div>
      {!comments.length && <Typography marginTop='3rem' align="center" variant="p" component='p' color={'secondary'} className="sm:text-2xl md:text-4xl font-varela">No comments yet</Typography>}
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
      <div className="fixed bottom-0 w-full h-20">
        <SearchBar
          search={newComment}
          setSearch={setNewComment}
          addComment={addComment}
          use={"comments"}
        />
      </div>
      {isCreatingComment && (
        <div className="grid place-items-center absolute top-0 right-0 left-0 bottom-0 bg-[#404040aa]">
          <Loader />
        </div>
      )}
    </Box>
  );
};

export default CommentsModal;
