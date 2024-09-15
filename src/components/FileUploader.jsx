import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

function ProfileImageUploader({ name, mode, image }) {
  const { register, unregister, setValue, watch } = useFormContext();
  const file = watch(name);
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        setValue(name, acceptedFiles);
        setImageToDisplay(URL.createObjectURL(acceptedFiles[0]))
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
        message: "Image required to post",
      },
    });
    return () => {
      unregister(name);
      URL.revokeObjectURL(file);
    };
  }, [register, unregister, name]);

  const [imageToDisplay, setImageToDisplay] = useState(file?.length > 0 ? URL.createObjectURL(file[0]) : image)

  return (
    <Box className="p-1 border border-dashed border-primary sm:h-80 md:h-96">
      {imageToDisplay ? (
        <div className="h-full pb-9">
          <div className="w-full overflow-hidden h-full">
            <img
              className="m-auto object-cover w-full h-fit"
              src={imageToDisplay}
            />
          </div>
          <Button
            color="primary"
            fullWidth
            className="font-varela pt-3 text-center cursor-pointer"
            onClick={() => {
              setValue(name, undefined);
              setImageToDisplay(undefined)
            }}
          >
            Remove picture
          </Button>
        </div>
      ) : (
        <div className="text-gray-600 w-full flex h-full font-varela px-3 cursor-pointer text-xl">
          <div
            {...getRootProps({
              className: "grid place-items-center w-full",
            })}
          >
            <input {...getInputProps()} />
            <p>Upload your memories here!</p>
          </div>
        </div>
      )}
    </Box>
  );
}
export default ProfileImageUploader;
