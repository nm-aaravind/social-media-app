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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleDropDown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropDownClose = () => {
    setAnchorEl(null);
  };
  const { mutateAsync: deleteComment, isPending: isDeletingComment } =
    useDeleteComment();
  if (isDeletingComment) {
    return (
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#404040aa]"></div>
    );
  }
  return (
    <div className="w-full flex sm:p-4 md:p-6 gap-3 ">
      <img
        src={comment.user?.profileimageurl}
        className="sm:w-20 md:w-24"
      ></img>
      <div className="flex flex-col w-full md:gap-1">
        <div className="flex justify-between w-full items-center -mt-1 text-ellipsis whitespace-nowrap overflow-hidden">
          <Typography
            fontFamily={"Varela Round"}
            variant="p"
            component="p"
            className="sm:text-lg md:text-2xl"
            color="secondary"
          >
            {comment.user?.username}
          </Typography>
          <Typography
            fontFamily={"Varela Round"}
            variant="p"
            component="p"
            className="sm:text-md md:text-lg"
            color="secondary"
          >
            {multiFormatDateString(comment.$createdAt)}
          </Typography>
        </div>
        <Divider className="bg-white/30" />
        <div className="flex justify-between">
          <Typography
            fontFamily={"Varela Round"}
            variant="p"
            component="p"
            className="sm:text-lg md:text-xl"
            color="secondary"
          >
            {comment.content}
          </Typography>
          <button
            onClick={handleDropDown}
            className="text-white hover:bg-[#404040] rounded-full w-9 h-9 mt-1"
          >
            <MoreVert />
          </button>
          <Menu
            PaperProps={{
              style: {
                backgroundColor: "#232323", // Set your desired grey background color here
                marginTop: "1.2rem",
                border: "3px solid #ebebeb33",
                color: "#ebebeb",
                borderRadius: "0px",
                minWidth: "100px",
                boxShadow: "0px 10px 5px rgba(0,0,0,0.6)",
                // Set your desired margin value here
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleDropDownClose}
            slots={{ listbox: Listbox }}
          >
            <MenuItem
              onClick={() => {
                handleDropDownClose();
                deleteComment({ commentId: comment.$id });
              }}
              sx={{
                "&:hover": { backgroundColor: "#333" },
                fontSize: "1.2rem",
                color: "#f73123",
                height: "3.5rem",
              }}
            >
              <p className="text-center w-full">Delete Comment</p>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Comment;
