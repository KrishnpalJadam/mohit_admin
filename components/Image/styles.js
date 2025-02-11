// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => {
  return {
    fillImage: {
      objectFit: "cover",
      position: "relative !important",
    },
  };
});

export default useStyles;
