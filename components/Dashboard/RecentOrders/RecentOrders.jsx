// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { GET_ORDERS } from "@/graphql/Orders.js";
import { getOrders } from "@/redux/slices/orders.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import useStyles from "./styles.js";

// ** Mui imports
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";

// ** Third party imports
import { useQuery } from "@apollo/client";
import { MdVisibility } from "react-icons/md";

export default function RecentOrders() {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // States
  const [orders, setOrders] = useState([]);

  // Queries
  const ordersQuery = useQuery(GET_ORDERS);

  // Orders
  const ordersData = useSelector((state) => state.orders.orders);

  useEffect(() => {
    const orders = ordersQuery?.data?.getOrders;

    if (orders && ordersData.length === 0) {
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

  return (
    <Card className={classes.bg}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Recent Orders
      </Typography>
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
          hideFooter
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
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
          }}
        />
      )}
    </Card>
  );
}
