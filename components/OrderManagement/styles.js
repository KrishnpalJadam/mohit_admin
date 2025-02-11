// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    // Orders table
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
    chip: {
      padding: "2px 8px",
      color: theme.palette.common.white,
      borderRadius: "20px",
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
      backgroundColor: theme.palette.info.main,
    },
    orderOutForDelivery: {
      backgroundColor: theme.palette.info.main,
    },
    orderDelivered: {
      backgroundColor: theme.palette.success.main,
    },
    // View order
    viewOrderCtn: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    orderTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      "& > h5": {
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
      "& > a": {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
    },
    orderActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      backgroundColor: theme.palette.grey[50],
      padding: "20px",
      borderRadius: "10px",
      border: `1px solid ${theme.palette.grey[200]}`,
      "& > div": {
        display: "flex",
        "& > div": {
          margin: "0 10px",
          [theme.breakpoints.down("sm")]: {
            margin: "10px 10px 0 0",
          },
        },
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    viewOrder: {
      padding: "50px",
      [theme.breakpoints.down("lg")]: {
        padding: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    highlight: {
      color: theme.palette.primary.main,
    },
    tabs: {
      width: "100%",
      display: "inline-block",
      marginTop: "25px",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
    tab: {
      display: "inline-block",
      margin: "0 25px 25px 0",
      padding: "10px",
      boxShadow: `${theme.palette.grey[300]} 0px 1px 4px`,
      borderRadius: "5px",
    },
    tabHighlight: {
      borderBottom: `5px solid ${theme.palette.primary.main}`,
    },
    productDetails: {
      marginTop: "50px",
    },
    productTab: {
      display: "flex",
      alignItems: "center",
    },
    productImage: {
      marginRight: "20px",
      borderRadius: "5px",
      objectFit: "cover",
      objectPosition: "top center",
    },
    appliedCoupon: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: "0.75rem !important",
      margin: "0 5px",
      padding: "3px 5px",
      borderRadius: "3px",
    },
    deliveryDetails: {
      marginTop: "50px",
    },
    otherDetails: {
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
    trackingLink: {
      width: "90%",
      marginBottom: "25px",
      "& .MuiTextField-root": {
        width: "100%",
      },
    },
  };
});

export default useStyles;
