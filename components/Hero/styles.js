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
    selectLayout: {
      marginTop: "30px",
      "& > div": {
        width: "100%",
      },
    },
    formFields: {
      width: "100%",
      display: "flex",
      columnGap: "20px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    formField: {
      width: "100%",
      marginTop: "30px",
      "& .MuiTextField-root": {
        width: "100%",
      },
    },
    actionBtn: {
      textAlign: "right",
      marginTop: "25px",
    },
    dropZone: {
      width: "100%",
      height: "300px",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      padding: "20px",
      borderRadius: "10px",
      borderColor: theme.palette.grey[300],
      border: "2px dashed",
      cursor: "pointer",
    },
    uploadContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    previewImgContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      marginTop: "50px",
      padding: "20px 10px",
      borderRadius: "10px",
      borderColor: theme.palette.grey[300],
      border: "1px dashed",
      cursor: "pointer",
    },
    previewImgs: {
      display: "inline-block",
    },
    previewImg: {
      width: "100px",
      height: "100px",
      display: "inline-block !important",
      "& img": {
        borderRadius: "10px",
        objectPosition: "center center",
      },
    },
    removeImg: {
      position: "absolute",
      top: "0",
      right: "0",
    },
    removeImgIcon: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      borderRadius: "10px",
    },
    removeAllBtn: {
      textAlign: "right",
      marginTop: "40px",
      [theme.breakpoints.down("sm")]: {
        marginTop: "20px",
      },
    },
  };
});

export default useStyles;
