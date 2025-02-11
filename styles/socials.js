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
    formField: {
      marginTop: "30px",
      "& .MuiTextField-root": {
        width: "100%",
      },
    },
    actionBtn: {
      textAlign: "right",
      marginTop: "25px",
    },
  };
});

export default useStyles;
