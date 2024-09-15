import { Divider, Typography, Menu, MenuItem } from "@mui/material";
import React from "react";
import { multiFormatDateString } from "../lib/utils";
import { MoreVert } from "@mui/icons-material";
import styled from "styled-components";
import { useDeleteComment } from "../lib/react-query/queries";
import Loader from "./Loader";

const Listbox = styled("ul")(
  ({ theme }) => `
    font-family: 'Varela', sans-serif;
    font-size: 1rem;
    box-sizing: border-box;
    min-width: 200px;
    border-radius: 0px;
    overflow: auto;
    box-shadow: 0px 4px 6px ${
      theme.palette.mode === "dark"
        ? "rgba(0,0,0, 0.50)"
        : "rgba(255,255,255, 1)"
    };
    z-index: 1;
    `
);

const Comment = ({ comment }) => {

  const { mutateAsync: deleteComment, isPending: isDeletingComment } =
    useDeleteComment();
  if (isDeletingComment) {
    return (
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#404040aa]"></div>
    );
  }
  return (
    <div className="w-full flex sm:p-2 md:p-4 gap-2 font-varela relative">
      <img
        src={comment.user?.profileimageurl}
        className="sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full"
      ></img>
      <div className="flex flex-col w-full md:gap-1 max-w-full" >
        <div className="flex justify-between">
          <Typography
            variant="p"
            component="p"
            className="text-md font-light"
            color="secondary"
          >
            {comment.user?.username}
          </Typography>
          <Typography
            variant="p"
            component="p"
            className="sm:text-sm md:text-sm font-light"
            color="secondary"
          >
            {multiFormatDateString(comment.$createdAt)}
          </Typography>
        </div>
        <Divider className="bg-white/30" />
        <div className="flex flex-wrap justify-between w-full">
          <p
            className="sm:text-md md:text-lg text-wrap max-w-lg text-black w-full"
          >
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
