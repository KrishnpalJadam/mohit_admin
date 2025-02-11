// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    form: {
      width: "100%",
      maxWidth: "400px",
      padding: "30px",
    },
    formField: {
      width: "100%",
      marginTop: "30px",
      "& .MuiFormControl-root": {
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
