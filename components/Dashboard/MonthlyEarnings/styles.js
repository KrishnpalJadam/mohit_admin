// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    bg: {
      backgroundImage: `linear-gradient(to right top, ${theme.palette.primary.light}10, ${theme.palette.primary.light}05)`,
      filter: "blur(0.3px)",
    },
    chart: {
      width: "100%",
      height: "300px",
      [theme.breakpoints.down("sm")]: {
        height: "200px",
      },
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
