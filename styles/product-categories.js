// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    tableContainer: {
      width: "100%",
      maxWidth: "550px",
      padding: "30px",
      [theme.breakpoints.down("md")]: {
        margin: "0 auto",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    table: {
      color: theme.palette.common.black,
      "& .MuiDataGrid-columnHeaders": {
        "& > div": {
          backgroundColor: `${theme.palette.primary.main} !important`,
          color: theme.palette.common.white,
          fontSize: "1rem",
        },
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-cell": {
        display: "flex",
        alignItems: "center",
        fontSize: "1rem",
        fontWeight: 400,
      },
      "& .MuiPaginationItem-root": {
        borderRadius: 50,
      },
      "& .MuiDataGrid-virtualScroller": {
        overflowX: "scroll",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.grey[400],
          borderRadius: "10px",
        },
      },
    },
    formFields: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      marginTop: "40px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    formField: {
      width: "100%",
      marginRight: "20px",
      "& .MuiTextField-root": {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        marginRight: 0,
      },
    },
    actionBtn: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      "& > button": {
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          marginTop: "30px",
        },
      },
    },
  };
});

export default useStyles;
