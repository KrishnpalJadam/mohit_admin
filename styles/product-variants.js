// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    // Variants table
    tableContainer: {
      width: "650px",
      maxWidth: "100%",
    },
    tableTop: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        "& > button": {
          marginTop: "30px",
        },
      },
    },
    searchFilter: {
      backgroundColor: `${theme.palette.primary.light}15`,
      margin: "30px 0",
      borderRadius: "10px",
      border: `1px solid ${theme.palette.grey[200]}`,
      padding: "30px 20px",
    },
    filter: {
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      "& .MuiTextField-root": {
        width: "100%",
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
    // Variant add or edit
    form: {
      width: "100%",
      maxWidth: "1000px",
      padding: "30px",
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    formFields: {
      display: "flex",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    formField: {
      width: "100%",
      margin: "0 10px 0",
      "& .MuiTextField-root": {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "10px 0",
      },
    },
    options: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "25px 0 10px",
      "& > div > svg": {
        margin: "7px",
        fontSize: "1.5em",
        cursor: "pointer",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "30px 0 0",
      },
    },
    actionBtn: {
      marginTop: "25px",
      textAlign: "right",
    },
  };
});

export default useStyles;
