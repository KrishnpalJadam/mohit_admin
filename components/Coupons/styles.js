// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    // Coupons table
    tableContainer: {
      width: "100%",
      maxWidth: "950px",
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
    couponCode: {
      backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      padding: "2px 8px",
      color: theme.palette.common.white,
      borderRadius: "20px",
    },
    // Coupon add or edit form
    form: {
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
    desktopDatePicker: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    mobileDatePicker: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    switchContainer: {
      display: "flex",
      padding: "35px 0 0 15px",
    },
    switch: {
      marginLeft: "15px",
    },
    actionBtn: {
      textAlign: "right",
      marginTop: "25px",
    },
    closeIcon: {
      textAlign: "right",
      "& > svg": {
        cursor: "pointer",
      },
    },
  };
});

export default useStyles;
