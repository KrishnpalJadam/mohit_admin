// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    // Products table
    tableContainer: {
      width: "100%",
      maxWidth: "1150px",
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
    searchFilters: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: `${theme.palette.primary.light}15`,
      padding: "20px",
      margin: "30px 0",
      borderRadius: "10px",
      border: `1px solid ${theme.palette.grey[200]}`,
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    filters: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "30px 0px 20px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    filter: {
      width: "100%",
      margin: "0 10px",
      "& .MuiTextField-root": {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "10px 0",
      },
    },
    product: {
      display: "flex",
      alignItems: "center",
      "& > img": {
        borderRadius: "5px",
        marginRight: "10px",
        objectFit: "cover",
        objectPosition: "top center",
      },
      "& > p": {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: "200px",
      },
    },
    inStock: {
      backgroundColor: theme.palette.success.main,
      padding: "2px 8px",
      color: theme.palette.common.white,
      borderRadius: "20px",
    },
    outOfStock: {
      backgroundColor: theme.palette.error.main,
      padding: "2px 8px",
      color: theme.palette.common.white,
      borderRadius: "20px",
    },
    // Products add or edit
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
    incDecBtn: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "30px",
      "& > div > svg": {
        fontSize: "1.5em",
        marginLeft: "10px",
        cursor: "pointer",
      },
    },
    variant: {
      margin: "25px 0",
      border: `2px dashed ${theme.palette.primary.light}20`,
      padding: "10px 7px",
      boxShadow: "none",
    },
    stockToggle: {
      display: "flex",
    },
    actionBtn: {
      textAlign: "right",
      marginTop: "25px",
    },
    dropZone: {
      width: "100%",
      height: "300px",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
      padding: "20px",
      borderRadius: "10px",
      borderColor: theme.palette.grey[300],
      border: "2px dashed",
      cursor: "pointer",
    },
    uploadContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    previewImgContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      marginTop: "50px",
      padding: "20px 10px",
      borderRadius: "10px",
      borderColor: theme.palette.grey[300],
      border: "1px dashed",
      cursor: "pointer",
    },
    previewImgs: {
      display: "inline-block",
    },
    previewImg: {
      width: "100px",
      height: "100px",
      display: "inline-block !important",
      "& img": {
        borderRadius: "10px",
      },
    },
    removeImg: {
      position: "absolute",
      top: "0",
      right: "0",
    },
    removeImgIcon: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      borderRadius: "10px",
    },
    removeAllBtn: {
      textAlign: "right",
      marginTop: "40px",
      [theme.breakpoints.down("sm")]: {
        marginTop: "20px",
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
      padding: "25px 10px",
      borderRadius: "7px",
      borderBottom: `5px solid ${theme.palette.primary.main}80`,
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
