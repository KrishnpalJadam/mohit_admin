// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { GET_ORDERS } from "@/graphql/Orders.js";
import { getOrders } from "@/redux/slices/orders.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import MuiPagination from "@/components/MuiPagination/MuiPagination";
import Seo from "@/components/Seo/Seo";
import useStyles from "@/components/OrderManagement/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";

// ** Third Party Imports
import { useQuery } from "@apollo/client";
import { MdVisibility } from "react-icons/md";

export default function OrderManagement() {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // States
  const [orders, setOrders] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("selectStatus");
  const [deliveryStatus, setDeliveryStatus] = useState("selectStatus");

  // Queries
  const ordersQuery = useQuery(GET_ORDERS);

  // Orders
  const ordersData = useSelector((state) => state.orders.orders);

  useEffect(() => {
    const orders = ordersQuery?.data?.getOrders;

    if (orders && ordersData?.length === 0) {
      dispatch(getOrders(orders));
    }

    setOrders(ordersData);
  }, [ordersQuery, ordersData]);

  //Total quantity
  const totalQuantity = (products) => {
    const items = products.map((product) => product.quantity);

    return items.reduce((a, b) => {
      return a + b;
    }, 0);
  };

  // Table columns
  const columns = [
    {
      field: "_id",
      headerName: "Order Id",
      width: 200,
    },
    {
      field: "totalAmount",
      headerName: "Amount",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography>
            {params.row.totalAmount}
            {process.env.NEXT_PUBLIC_STORE_CURRENCY}
          </Typography>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "paid" && (
              <Typography
                variant="body1"
                className={`${classes.chip} ${classes.paid}`}
              >
                {CapitalizeText(params.row.paymentStatus)}
              </Typography>
            )}
            {params.row.paymentStatus === "unpaid" && (
              <Typography
                variant="body1"
                className={`${classes.chip} ${classes.unPaid}`}
              >
                {CapitalizeText(params.row.paymentStatus)}
              </Typography>
            )}
          </div>
        );
      },
    },
    {
      field: "itemQuantity",
      headerName: "Quantity",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Typography>{totalQuantity(params.row.products)}</Typography>;
      },
    },
    {
      field: "dateOfPurchase",
      headerName: "Purchased On",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography>
            {new Date(params.row.dateOfPurchase).toLocaleDateString()}
          </Typography>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "processing" && (
              <Typography
                variant="body1"
                className={`${classes.chip} ${classes.orderProcessing}`}
              >
                {CapitalizeText(params.row.deliveryStatus)}
              </Typography>
            )}
            {params.row.deliveryStatus === "shipped" && (
              <Typography
                variant="body1"
                className={`${classes.chip} ${classes.orderShipped}`}
              >
                {CapitalizeText(params.row.deliveryStatus)}
              </Typography>
            )}
            {params.row.deliveryStatus === "outForDelivery" && (
              <Typography
                variant="body1"
                className={`${classes.chip} ${classes.orderOutForDelivery}`}
              >
                {CapitalizeText(params.row.deliveryStatus)}
              </Typography>
            )}
            {params.row.deliveryStatus === "delivered" && (
              <Typography
                variant="body1"
                className={`${classes.chip} ${classes.orderDelivered}`}
              >
                {CapitalizeText(params.row.deliveryStatus)}
              </Typography>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <Link href={"/orders/" + params.row._id}>
              <IconButton>
                <Tooltip title="View Order" arrow>
                  <span>
                    <MdVisibility />
                  </span>
                </Tooltip>
              </IconButton>
            </Link>
          </>
        );
      },
    },
  ];

  // Filters
  const handlePaymentFilter = (e) => {
    setPaymentStatus(e.target.value);

    if (e.target.value !== "selectStatus") {
      const filteredOrders = ordersData.filter((order) => {
        return order.paymentStatus === e.target.value;
      });

      setOrders(filteredOrders);
    } else {
      setOrders(ordersData);
    }
  };

  const handleDeliveryFilter = (e) => {
    setDeliveryStatus(e.target.value);

    if (e.target.value !== "selectStatus") {
      const filteredOrders = ordersData.filter((order) => {
        return order.deliveryStatus === e.target.value;
      });

      setOrders(filteredOrders);
    } else {
      setOrders(ordersData);
    }
  };

  // Search
  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = ordersData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field] && row[field].toString());
      });
    });
    setOrders(filteredRows);
  };

  return (
    <div className={classes.tableContainer}>
      <Seo title={"Order Management"} />
      <Typography variant="h4">Orders Management</Typography>
      <div className={classes.searchFilters}>
        <Typography variant="h5">Search Filters</Typography>
        <div className={classes.filters}>
          <Select
            value={paymentStatus}
            onChange={handlePaymentFilter}
            inputProps={{ "aria-label": "Without label" }}
            className={classes.filter}
          >
            <MenuItem value={"selectStatus"}>Select Status</MenuItem>
            <MenuItem value={"paid"}>Paid</MenuItem>
            <MenuItem value={"unpaid"}>Unpaid</MenuItem>
          </Select>
          <Select
            value={deliveryStatus}
            onChange={handleDeliveryFilter}
            inputProps={{ "aria-label": "Without label" }}
            className={classes.filter}
          >
            <MenuItem value={"selectStatus"}>Select Status</MenuItem>
            <MenuItem value={"processing"}>Processing</MenuItem>
            <MenuItem value={"shipped"}>Shipped</MenuItem>
            <MenuItem value={"outForDelivery"}>Out For Delivery</MenuItem>
            <MenuItem value={"delivered"}>Delivered</MenuItem>
          </Select>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className={classes.filter}
          >
            <TextField
              label="Search order..."
              type="search"
              variant="outlined"
              onChange={(e) => {
                requestSearch(e.target.value);
              }}
            />
          </Box>
        </div>
      </div>
      {Array.isArray(orders) && (
        <DataGrid
          className={classes.table}
          rows={orders}
          columns={columns}
          getRowId={(row) => row._id}
          align="center"
          density="comfortable"
          headerHeight={60}
          rowHeight={60}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 6 },
            },
          }}
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No orders found
              </Stack>
            ),
            noResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No orders found
              </Stack>
            ),
            pagination: MuiPagination,
          }}
        />
      )}
    </div>
  );
}

export { getServerSideProps };
