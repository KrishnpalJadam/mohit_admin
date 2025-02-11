// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    form: {
      width: "100%",
      maxWidth: "1000px",
      padding: "30px",
      [theme.breakpoints.down("md")]: {
        margin: "0 auto",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    switchContainer: {
      display: "flex",
      marginTop: "40px",
    },
    switch: {
      marginLeft: "20px",
    },
    formField: {
      marginTop: "40px",
      "& .MuiTextField-root": {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "0",
      },
    },
    actionBtn: {
      textAlign: "right",
      marginTop: "25px",
    },
    dropZone: {
      width: "100%",
      height: "500px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      padding: "20px",
      borderRadius: "10px",
      borderColor: theme.palette.grey[300],
      border: "2px dashed",
      cursor: "pointer",
      [theme.breakpoints.down("lg")]: {
        width: "100%",
        height: "400px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "250px",
      },
    },
    previewImg: {
      width: "100%",
      height: "100%",
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
