// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { GET_ORDER_BY_ID } from "@/graphql/Orders.js";
import { addOrder } from "@/redux/slices/orders.js";
import CapitalizeText from "@/helpers/CapitalizeText";
import FulfillmentModal from "@/components/OrderManagement/FulfillmentModal";
import PaymentModal from "@/components/OrderManagement/PaymentModal";
import CustomImage from "@/components/Image/CustomImage";
import Seo from "@/components/Seo/Seo";
import SecondaryButton from "@/components/Button/SecondaryButton";
import Toaster from "@/components/Toaster/Toaster";
import useStyles from "@/components/OrderManagement/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

// ** Third Party Imports
import { useMutation } from "@apollo/client";

export default function ViewOrder() {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const router = useRouter();

  // Order id
  const orderId = router.asPath.split("/")[2];

  // States
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [fulfillmentModal, setFulfillmentModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [disableProcessing, setDisableProcessing] = useState(true);
  const [disableShipped, setDisableShipped] = useState(true);
  const [disableOutForDelivery, setDisableOutForDelivery] = useState(true);
  const [disableDelivered, setDisableDelivered] = useState(true);
  const [disablePaid, setDisablePaid] = useState(true);
  const [disableUnpaid, setDisableUnpaid] = useState(true);

  // Queries
  const [getOrderById] = useMutation(GET_ORDER_BY_ID, {
    onCompleted(data) {
      if (data.getOrderById) {
        dispatch(addOrder(data.getOrderById));
      }
    },
  });

  // Orders
  const ordersData = useSelector((state) => state.orders.orders);

  useEffect(() => {
    if (orderId?.length === 24) {
      if (ordersData?.length > 0) {
        const order = ordersData.find((item) => {
          return item._id === orderId;
        });

        setOrder(order);
      } else {
        getOrderById({ variables: { id: orderId } });
      }
    }
  }, [orderId, ordersData]);

  // Initialize payment & delivery status
  useEffect(() => {
    if (order?.customer) {
      setCustomer(order.customer);
    }

    if (paymentStatus === null && deliveryStatus === null) {
      if (order?.paymentStatus) {
        setPaymentStatus(order && order.paymentStatus);
      }

      if (order?.deliveryStatus) {
        setDeliveryStatus(order && order.deliveryStatus);
      }
    }

    if (order?.deliveryStatus) {
      switch (order.deliveryStatus) {
        case "processing":
          setDisableProcessing(true);
          setDisableShipped(false);
          break;
        case "shipped":
          setDisableShipped(true);
          setDisableOutForDelivery(false);
          break;
        case "outForDelivery":
          setDisableOutForDelivery(true);
          setDisableDelivered(false);
          break;
        case "delivered":
          setDisableDelivered(true);
          break;
        default:
          setDisableProcessing(true);
          break;
      }
    }

    if (order?.paymentStatus) {
      switch (order.paymentStatus) {
        case "paid":
          setDisablePaid(true);
          break;
        case "unpaid":
          setDisablePaid(false);
          setDisableUnpaid(true);
          break;
        default:
          setDisablePaid(true);
          break;
      }
    }
  }, [order]);

  // To payment & delivery status
  const handlePaymentStatus = (e) => {
    setPaymentStatus(e.target.value);
    setPaymentModal(!fulfillmentModal);
  };

  const handleDeliveryStatus = (e) => {
    setDeliveryStatus(e.target.value);
    setFulfillmentModal(!fulfillmentModal);
  };

  const handleFulfillmentModal = (value) => {
    setFulfillmentModal(!fulfillmentModal);

    if (value) {
      switch (value) {
        case "shipped":
          setDeliveryStatus("processing");
          break;
        case "outForDelivery":
          setDeliveryStatus("shipped");
          break;
        case "delivered":
          setDeliveryStatus("outForDelivery");
          break;
        default:
          setDeliveryStatus("processing");
          break;
      }
    }
  };

  const handlePaymentModal = (value) => {
    setPaymentModal(!paymentModal);

    if (value === "paid") {
      setPaymentStatus("unpaid");
    } else {
      setPaymentStatus("paid");
    }
  };

  return (
    <div className={classes.viewOrderCtn}>
      <Seo title={"View Order"} />
      <Toaster />
      {order && (
        <>
          {/* Order details */}
          <div className={classes.orderTop}>
            <Typography variant="h4">
              Order ID: <span className={classes.highlight}>#{order._id}</span>
            </Typography>
            <SecondaryButton
              text="Go Back"
              href="/orders/all"
              style={{ display: { xs: "none", sm: "block" } }}
            />
          </div>
          {/* Order action */}
          <div className={classes.orderActions}>
            <Typography variant="h4">Actions</Typography>
            <div>
              <Select
                value={paymentStatus}
                onChange={handlePaymentStatus}
                label="Payment Status"
              >
                <MenuItem value={"unpaid"} disabled={disableUnpaid}>
                  Unpaid
                </MenuItem>
                <MenuItem value={"paid"} disabled={disablePaid}>
                  Paid
                </MenuItem>
              </Select>
              <Select
                value={deliveryStatus}
                onChange={handleDeliveryStatus}
                label="Delivery Status"
              >
                <MenuItem value={"processing"} disabled={disableProcessing}>
                  Processing
                </MenuItem>
                <MenuItem value={"shipped"} disabled={disableShipped}>
                  Shipped
                </MenuItem>
                <MenuItem
                  value={"outForDelivery"}
                  disabled={disableOutForDelivery}
                >
                  Out For Delivery
                </MenuItem>
                <MenuItem value={"delivered"} disabled={disableDelivered}>
                  Delivered
                </MenuItem>
              </Select>
            </div>
          </div>
          {/* Order details */}
          <Paper className={classes.viewOrder}>
            <>
              <Typography variant="h5">
                Order Status:
                <span className={classes.highlight}>
                  {" "}
                  {CapitalizeText(order.deliveryStatus)}
                </span>
              </Typography>
              <div className={classes.tabs}>
                <div
                  className={`${classes.tab} ${
                    order.deliveryStatus === "processing" &&
                    classes.tabHighlight
                  }`}
                >
                  {order.deliveryStatus === "processing" ? (
                    <CustomImage
                      src={"/assets/Gif/orderProcessing.gif"}
                      alt="order processing"
                      width={70}
                      height={70}
                    />
                  ) : (
                    <CustomImage
                      src={"/assets/orderProcessing.png"}
                      alt="order processing"
                      width={70}
                      height={70}
                    />
                  )}
                </div>
                <div
                  className={`${classes.tab} ${
                    order.deliveryStatus === "shipped" && classes.tabHighlight
                  }`}
                >
                  {order.deliveryStatus === "shipped" ? (
                    <CustomImage
                      src={"/assets/Gif/orderShipped.gif"}
                      alt="order shipped"
                      width={70}
                      height={70}
                    />
                  ) : (
                    <CustomImage
                      src={"/assets/orderShipped.png"}
                      alt="order shipped"
                      width={70}
                      height={70}
                    />
                  )}
                </div>
                <div
                  className={`${classes.tab} ${
                    order.deliveryStatus === "outForDelivery" &&
                    classes.tabHighlight
                  }`}
                >
                  {order.deliveryStatus === "outForDelivery" ? (
                    <CustomImage
                      src={"/assets/Gif/orderOutForDelivery.gif"}
                      alt="order out for delivery"
                      width={70}
                      height={70}
                    />
                  ) : (
                    <CustomImage
                      src={"/assets/orderOutForDelivery.png"}
                      alt="order out for delivery"
                      width={70}
                      height={70}
                    />
                  )}
                </div>
                <div
                  className={`${classes.tab} ${
                    order.deliveryStatus === "delivered" && classes.tabHighlight
                  }`}
                >
                  {order.deliveryStatus === "delivered" ? (
                    <CustomImage
                      src={"/assets/Gif/orderDelivered.gif"}
                      alt="order delivered"
                      width={70}
                      height={70}
                    />
                  ) : (
                    <CustomImage
                      src={"/assets/orderDelivered.png"}
                      alt="order delivered"
                      width={70}
                      height={70}
                    />
                  )}
                </div>
              </div>
            </>
            {/* Product Details */}
            <div className={classes.productDetails}>
              <Typography variant="h5" sx={{ pb: 3 }}>
                Items:
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6">Product</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6">Quantity </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6">Price</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.products?.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" align="left">
                          <div className={classes.productTab}>
                            <CustomImage
                              src={
                                process.env.NEXT_PUBLIC_BACKEND_URL +
                                "product/" +
                                product.images[0]
                              }
                              alt={product.name}
                              width={90}
                              height={85}
                              style={classes.productImage}
                            />
                            <div>
                              <Typography variant="h6">
                                {CapitalizeText(product.name)}
                              </Typography>
                              {product.variantId && (
                                <Typography
                                  variant="subtitle2"
                                  sx={{ mt: 1, fontSize: "11px", opacity: 0.9 }}
                                >
                                  {product.variantName.toUpperCase()}
                                </Typography>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle1">
                            {product.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle1">
                            {product.price}
                            {process.env.NEXT_PUBLIC_STORE_CURRENCY}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="h6"></Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="subtitle1">Mrp:</Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="subtitle1">
                          {order.mrp}
                          {process.env.NEXT_PUBLIC_STORE_CURRENCY}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="subtitle1"></Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="subtitle1">Shipping:</Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        sx={{ borderBottom: "none" }}
                      >
                        <Typography variant="subtitle1">
                          {order.shippingFees === "FREE"
                            ? order.shippingFees
                            : order.shippingFees +
                              process.env.NEXT_PUBLIC_STORE_CURRENCY}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {order.appliedCoupon && (
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          align="right"
                          sx={{ borderBottom: "none" }}
                        >
                          <Typography variant="subtitle1"></Typography>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="right"
                          sx={{ borderBottom: "none" }}
                        >
                          <Typography variant="subtitle1">
                            Discount (
                            <span className={classes.appliedCoupon}>
                              {order.appliedCoupon}
                            </span>
                            ) :
                          </Typography>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="left"
                          sx={{ borderBottom: "none" }}
                        >
                          <Typography variant="subtitle1">
                            - {order.couponDiscount}
                            {process.env.NEXT_PUBLIC_STORE_CURRENCY}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell component="th" scope="row" align="right">
                        <Typography variant="subtitle1"></Typography>
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        <Typography variant="subtitle1">Taxes:</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        <Typography variant="subtitle1">
                          {order.taxes}
                          {process.env.NEXT_PUBLIC_STORE_CURRENCY}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="right">
                        <Typography variant="subtitle1"></Typography>
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        <Typography variant="subtitle1">Total:</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        <Typography variant="subtitle1">
                          <b>
                            {order.totalAmount}
                            {process.env.NEXT_PUBLIC_STORE_CURRENCY}
                          </b>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {/* Customer Details */}
            {customer && (
              <div className={classes.deliveryDetails}>
                <Typography variant="h5" sx={{ pb: 2 }}>
                  Delivery details:
                </Typography>
                <div>
                  <Typography variant="subtitle1">
                    Name: {customer.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    Email: {customer.email}
                  </Typography>
                  <Typography variant="subtitle1">
                    Phone: {customer.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle1">
                    Address:{" "}
                    {`${customer.address.address1}, ${customer.address.address2}, ${customer.address.city}, ${customer.address.state}, ${customer.address.country}, ${customer.address.postal_code}`}
                  </Typography>
                </div>
              </div>
            )}
            {/* Other Details */}
            <div className={classes.otherDetails}>
              <Typography variant="h5" sx={{ pb: 2 }}>
                Other details:
              </Typography>
              <Typography variant="subtitle1">
                Order id: #{order._id}
              </Typography>
              <Typography variant="subtitle1">
                Payment method: {order.paymentMethod}
              </Typography>
            </div>
          </Paper>
          {/* Fulfillment confirmation modal */}
          <Modal open={fulfillmentModal} onClose={handleFulfillmentModal}>
            <FulfillmentModal
              closeModal={handleFulfillmentModal}
              deliveryStatus={deliveryStatus}
            />
          </Modal>
          {/* Payment confirmation modal */}
          <Modal open={paymentModal} onClose={handlePaymentModal}>
            <PaymentModal
              closeModal={handlePaymentModal}
              paymentStatus={paymentStatus}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

export { getServerSideProps };
