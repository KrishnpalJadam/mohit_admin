// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    bg: {
      height: "100%",
      backgroundImage: `linear-gradient(to right top, ${theme.palette.primary.light}10, ${theme.palette.primary.light}05)`,
      filter: "blur(0.3px)",
    },
    avatar: {
      width: "50px",
      height: "50px",
      padding: "7px",
      backgroundColor: theme.palette.primary.main,
    },
  };
});

export default useStyles;
