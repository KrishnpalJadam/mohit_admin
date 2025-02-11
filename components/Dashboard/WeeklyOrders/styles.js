// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    bg: {
      backgroundImage: `linear-gradient(to right top, ${theme.palette.primary.light}10, ${theme.palette.primary.light}05)`,
      filter: "blur(0.3px)",
    },
    avatar: {
      width: "50px",
      height: "50px",
      padding: "10px",
      marginRight: "15px",
      backgroundColor: theme.palette.primary.main,
    },
    increase: {
      color: theme.palette.success.main,
    },
    decrease: {
      color: theme.palette.error.main,
    },
  };
});

export default useStyles;
