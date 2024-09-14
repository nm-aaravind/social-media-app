import React, { useContext } from "react";
import {
  TextField,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import FileUploader from "./FileUploader";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

function PostForm({ post, mode, method }) {
  const { userDetails, showToast } = useContext(UserContext);
  console.log(userDetails, "Context")
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      caption: post ? post?.caption : "",
      location: post ? post?.location : "",
      tags: post ? post?.tags.map((element) => "#" + element).join(", ") : "",
      file: [],
    },
  });
  async function formSubmit(data) {
    try {
      if (mode == "Create") {
        const createdPost = await method({ ...data, user: userDetails });
        if (!createdPost) {
          throw Error("Cannot create post");
        }
        showToast("success", "Created post successfully");
        navigate("/");
      } else if (mode == "Update") {
        const updatePost = await method({
          ...data,
          postId: post.$id,
          imageId: post.imageId,
        });
        if (!updatePost) {
          throw Error("Cannot update post");
        }
        showToast("success", "Updated post successfully");
        return navigate(`/posts/${post.$id}`);
      }
    } catch (error) {
      showToast("error", `Error: ${error.message}`);
      throw error;
    }
  }
  return (
    <FormProvider {...methods}>
      <form className="h-96" onSubmit={methods.handleSubmit(formSubmit)}>
        <Box>
          <Typography className="py-5" variant="h4" gutterBottom>
            {mode} Post
            <Divider />
          </Typography>
          <Grid container className="h-full" spacing={2}>
            <Grid item xs={12} md={6}>
              <FileUploader
                name="file"
                mode={mode}
                image={mode == "create" ? false : post?.image}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className="flex justify-between gap-8 flex-wrap"
            >
              <TextField
                label="Caption"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                {...methods.register("caption", {
                  max: {
                    value: 2200,
                    message: "Max 2200 characters allowed",
                  },
                })}
              />
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                {...methods.register("location", {
                  max: {
                    value: 2200,
                    message: "Max 2200 characters allowed",
                  },
                })}
                name="location"
                id="location"
              />
              <TextField
                label="Tags (comma-separated)"
                variant="outlined"
                fullWidth
                {...methods.register("tags", {
                  max: {
                    value: 2200,
                    message: "Max 2200 characters allowed",
                  },
                })}
                name="tags"
                id="tags"
              />
              <Button
                type="submit"
                sx={{ height: "3rem" }}
                variant="contained"
                color="primary"
                fullWidth
              >
                {mode}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
}

export default PostForm;
