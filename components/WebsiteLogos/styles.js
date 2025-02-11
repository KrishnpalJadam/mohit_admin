// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    // Form
    form: {
      width: "100%",
      maxWidth: "800px",
      padding: "30px",
      [theme.breakpoints.down("md")]: {
        margin: "0 auto",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    formField: {
      width: "100%",
      marginTop: "30px",
    },
    actionBtn: {
      textAlign: "right",
      paddingTop: "25px",
    },
    // Dropzone
    dropZone: {
      width: "100%",
      height: "400px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      padding: "20px",
      borderRadius: "10px",
      border: `2px dashed ${theme.palette.grey[300]}`,
      cursor: "pointer",
      [theme.breakpoints.down("lg")]: {
        height: "350px",
      },
      [theme.breakpoints.down("sm")]: {
        height: "250px",
      },
    },
    previewImg: {
      width: "50%",
      height: "50%",
      "& > img": {
        objectFit: "contain",
      },
    },
    editOverlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.common.white,
      borderRadius: "10px",
      transition: "0.4s",
      opacity: "0",
      "&:hover": {
        opacity: "1",
      },
    },
  };
});

export default useStyles;
