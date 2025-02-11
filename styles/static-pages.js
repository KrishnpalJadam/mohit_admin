// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    // Static pages table
    tableContainer: {
      width: "100%",
      maxWidth: "900px",
    },
    tableTop: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        "& > a > button": {
          marginTop: "30px",
          width: "100%",
        },
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
    // Static page form
    form: {
      width: "100%",
      maxWidth: "1000px",
      padding: "30px",
      [theme.breakpoints.down("md")]: {
        margin: "0 auto",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    formField: {
      width: "100%",
      marginTop: "30px",
      "& .MuiTextField-root": {
        width: "100%",
      },
    },
    actionBtn: {
      marginTop: "25px",
      textAlign: "right",
    },
  };
});

export default useStyles;
