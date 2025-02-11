// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    form: {
      width: "100%",
      maxWidth: "450px",
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
      margin: "10px 0 30px",
      "& .MuiFormControl-root": {
        width: "100%",
      },
    },
    actionBtn: {
      textAlign: "right",
    },
  };
});

export default useStyles;
