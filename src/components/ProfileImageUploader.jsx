import React, { useCallback, useState, memo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { avatars } from "../lib/appwrite/config";

function ProfileImageUploader({ name, mode, image, setImage, user_name }) {
  const { register, unregister, setValue, watch } = useFormContext();
  const file = watch(name);
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      if (acceptedFiles?.length) {
        setValue(name, acceptedFiles);
        setImage(URL.createObjectURL(acceptedFiles[0]));
      }
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
  });

  useEffect(() => {
    register(name, {
      required: {
        value: mode == "create" ? true : false,
        message: "Image required",
      },
    });
    return () => {
      unregister(name);
      URL.revokeObjectURL(file);
    };
  }, [register, unregister, name]);
  return (
    <Box className="">
      <div className="relative w-fit overflow-hidden hover-css rounded-full m-auto">
        <img
          className="m-auto w-32 h-32 rounded-full object-fill"
          src={image}
        ></img>
        <div
          {...getRootProps({
            className: "absolute bg-gray-400 top-0 ",
          })}
        >
          <input {...getInputProps({})} id="file" />
          <p className="sm:text-xs md:text-sm text-center translate-y-12 px-3 text-white font-varela">
            Click to add/edit photo
          </p>
        </div>
      </div>
      {
        file && <Typography
        color="primary"
        className="font-varela pt-3 text-center cursor-pointer"
          onClick={() => {
            setImage(avatars.getInitials(user_name));
            setValue(name, undefined);
          }}
        >
          Remove picture
        </Typography>
      }
    </Box>
  );
}

export default ProfileImageUploader;
