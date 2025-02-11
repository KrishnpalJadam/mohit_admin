// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    // Customers tables
    tableContainer: {
      width: "100%",
      maxWidth: "1100px",
    },
    searchFilters: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: `${theme.palette.primary.light}15`,
      margin: "30px 0",
      borderRadius: "10px",
      border: `1px solid ${theme.palette.grey[200]}`,
      padding: "30px 20px",
    },
    filters: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "30px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    filter: {
      width: "100%",
      marginRight: "20px",
      "& .MuiTextField-root": {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "10px 0",
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
    customer: {
      display: "flex",
      alignItems: "center",
    },
    chip: {
      padding: "2px 8px",
      color: theme.palette.common.white,
      borderRadius: "20px",
    },
    customerActive: {
      backgroundColor: theme.palette.success.dark,
    },
    customerSuspended: {
      backgroundColor: theme.palette.error.main,
    },
    // View customer
    viewCustomer: {
      width: "100%",
      maxWidth: "1100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    customerBasicDetails: {
      width: "100%",
      display: "grid",
      placeItems: "center",
      backgroundColor: `${theme.palette.primary.light}15`,
      borderRadius: "6px",
      padding: "30px 20px",
    },
    avatar: {
      width: "100px",
      height: "100px",
      border: `5px solid ${theme.palette.primary.main}50`,
      [theme.breakpoints.down("sm")]: {
        width: "80px",
        height: "80px",
      },
    },
    totalSpends: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      "& > div": {
        display: "flex",
        alignItems: "flex-end",
        padding: "0 10px",
        [theme.breakpoints.down("sm")]: {
          marginBottom: "20px",
        },
      },
    },
    totalSpendsIcon: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      fontSize: "4rem",
      padding: "12px",
      borderRadius: "6px",
      marginRight: "16px",
    },
    customerDetails: {
      width: "100%",
      marginTop: "50px",
      border: `1px solid ${theme.palette.grey[200]}`,
      overflow: "auto",
    },
    recentOrders: {
      width: "100%",
      maxWidth: "1100px",
      marginTop: "50px",
    },
    paid: {
      backgroundColor: theme.palette.success.main,
    },
    unPaid: {
      backgroundColor: theme.palette.error.main,
    },
    orderProcessing: {
      backgroundColor: theme.palette.grey[600],
    },
    orderShipped: {
      backgroundColor: theme.palette.success.main,
    },
    orderOutForDelivery: {
      backgroundColor: theme.palette.info.main,
    },
    orderDelivered: {
      backgroundColor: theme.palette.success.main,
    },
    customerActions: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: "50px",
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
