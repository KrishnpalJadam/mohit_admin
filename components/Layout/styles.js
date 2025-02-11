// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const drawerWidth = parseInt(process.env.NEXT_PUBLIC_DRAWER_WIDTH) + "px";

const useStyles = makeStyles()((theme) => {
  return {
    children: {
      display: "flex",
      flexDirection: "column",
      flexGrow: "1",
      padding: "30px 40px",
      position: "absolute",
      width: `calc(100% - ${drawerWidth})`,
      right: 0,
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "30px 10px",
      },
    },
    drawer: {
      overflowY: "auto",
      margin: 0,
      padding: 0,
      listStyle: "none",
      height: "100%",
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.grey[200],
        borderRadius: "10px",
      },
    },
    logo: {
      padding: "15px",
      "& > a > div": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > h6": {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.common.black,
          margin: "-10px 0 0 10px",
          padding: "0 5px",
          borderRadius: "2px",
        },
      },
    },
    appBar: {
      backgroundColor: theme.palette.common.white,
    },
    sidebarIcon: {
      fontSize: "1.5em",
      cursor: "pointer",
      color: theme.palette.common.black,
    },
    sidebarText: {
      color: theme.palette.common.black,
      cursor: "pointer",
      marginLeft: "-20px",
    },
    logout: {
      color: theme.palette.common.black,
      cursor: "pointer",
      "& > h5": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > svg": {
          marginLeft: "10px",
        },
      },
    },
  };
});

export default useStyles;
