// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    wrapper: {
      padding: "5px",
      marginTop: "20px",
      border: "1px solid",
      borderColor: theme.palette.grey[200],
      minHeight: "300px",
    },
  };
});

export default useStyles;
