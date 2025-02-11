// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    form: {
      width: "100%",
      maxWidth: "600px",
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
    formFields: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    formField: {
      width: "50%",
      display: "flex",
    },
    trendingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      border: `2px solid ${theme.palette.grey[300]}`,
      boxShadow: `3px 3px 3px ${theme.palette.grey[200]}`,
    },
    limitText: {
      fontSize: "2rem !important",
      marginLeft: "10px",
    },
    limitBtn: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40px",
      height: "40px",
      margin: "0 10px",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderRadius: "50px",
      cursor: "pointer",
    },
    actionBtn: {
      textAlign: "right",
      marginTop: "25px",
    },
  };
});

export default useStyles;
