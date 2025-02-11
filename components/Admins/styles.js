// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    // Admins table
    adminsTableContainer: {
      width: "100%",
      maxWidth: "800px",
    },
    tableTop: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        "& > button": {
          marginTop: "30px",
        },
      },
    },
    searchFilter: {
      backgroundColor: `${theme.palette.primary.light}15`,
      marginBottom: "30px",
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
    // Roles table
    rolesTableContainer: {
      width: "550px",
      maxWidth: "100%",
    },
    // Create / edit admin
    adminsForm: {
      width: "95%",
      maxWidth: "600px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      maxHeight: "95vh",
      padding: "30px",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.grey[400],
        borderRadius: "10px",
      },
      [theme.breakpoints.down("md")]: {
        padding: "25px",
      },
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
      margin: "30px 10px 0",
      "& .MuiTextField-root": {
        width: "100%",
      },
      "& .MuiFormControl-root": {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "30px 0 0",
      },
    },
    actionBtn: {
      textAlign: "right",
      marginTop: "25px",
    },
    closeIcon: {
      textAlign: "right",
      "& > svg": {
        fontSize: "1.5rem",
        cursor: "pointer",
      },
    },
    // Create / edit role
    rolesForm: {
      width: "95%",
      maxWidth: "600px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      maxHeight: "95vh",
      padding: "30px",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.grey[400],
        borderRadius: "10px",
      },
      [theme.breakpoints.down("md")]: {
        padding: "25px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
    privileges: {
      [theme.breakpoints.down("sm")]: {
        padding: "0 10px",
      },
    },
    // Confirmation modal
    confirmationModal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "95%",
      maxWidth: "400px",
      textAlign: "center",
      padding: "15px 10px",
    },
    message: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    },
  };
});

export default useStyles;
