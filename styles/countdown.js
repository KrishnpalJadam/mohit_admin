// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    form: {
      width: "100%",
      maxWidth: "500px",
      padding: "30px",
      [theme.breakpoints.down("md")]: {
        margin: "0 auto",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    formField: {
      marginTop: "35px",
      "& .MuiFormControl-root": {
        width: "100%",
      },
    },
    switchContainer: {
      display: "flex",
      marginTop: "40px",
    },
    switch: {
      marginLeft: "20px",
    },
    actionBtn: {
      textAlign: "right",
      marginTop: "25px",
    },
  };
});

export default useStyles;
