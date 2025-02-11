// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    bg: {
      height: "100%",
      backgroundImage: `linear-gradient(to right top, ${theme.palette.primary.light}10, ${theme.palette.primary.light}05)`,
      filter: "blur(0.3px)",
    },
    content: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingBottom: "0 !important",
    },
  };
});

export default useStyles;
