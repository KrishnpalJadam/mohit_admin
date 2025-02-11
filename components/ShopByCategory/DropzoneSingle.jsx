// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from "@/components/Image/CustomImage";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "./styles.js";

// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function DropzoneSingle(props) {
  const { classes } = useStyles();

  // States
  const [prevImage, setPrevImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: "image/*",
    maxSize: 1000000,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        // For preview images while uploading
        const imageFile = Object.assign(acceptedFiles);

        setPrevImage(...imageFile);

        // To store images in server
        let image = new FormData();

        image.append("<HOMEPAGE_IMAGES>", acceptedFiles[0]);

        const { data } = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "homepage-images",
          image
        );

        const path = data.paths[0].split("/")[3];

        if (props.onChange) {
          props.onChange(path);
        }
      }
    },
    onDropRejected: () => {
      ToastStatus(
        "Error",
        "You can only upload a file of maximum size of 1 MB."
      );
    },
  });

  useEffect(() => {
    const image = props.value;

    // Convert to blob image
    if (image && !prevImage) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${image}`)
        .then((res) => res.blob())
        .then((blob) => {
          setPrevImage(blob);
        })
        .catch((error) => {
          // Handle error if the fetch operation fails
          console.error("Error uploading images");
        });
    }
  }, [props.value]);

  // Render the preview image
  const renderImage = (
    <div>
      <div className={classes.dropZone}>
        <div className={classes.previewImg}>
          <CustomImage
            alt={"shop by category"}
            src={URL.createObjectURL(new Blob([prevImage]))}
            fill={true}
          />
        </div>
        <div className={classes.editOverlay}>
          <CustomImage
            src={"/assets/changeImage.png"}
            alt="change logo"
            width={100}
            height={100}
          />
        </div>
      </div>
      <Typography sx={{ mt: 1 }} variant="body1" align="center">
        {props.text}
      </Typography>
    </div>
  );

  const handleLinkClick = (event) => {
    event.preventDefault();
  };

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      <Box>
        {prevImage ? (
          renderImage
        ) : (
          <Box className={classes.dropZone}>
            <CustomImage
              src={"/assets/uploadIcon.png"}
              alt="upload icon"
              width={100}
              height={100}
            />
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Drop files here or click{" "}
              <Link href="/" onClick={handleLinkClick}>
                browse
              </Link>{" "}
              thorough your machine
            </Typography>
            <Typography sx={{ mt: 1 }} variant="body1" align="center">
              {props.text}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
