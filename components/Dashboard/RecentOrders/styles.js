// ** MUI Imports
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    bg: {
      backgroundImage: `linear-gradient(to right top, ${theme.palette.primary.light}10, ${theme.palette.primary.light}05)`,
      filter: "blur(0.3px)",
      padding: "20px",
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
  };
});

export default useStyles;
