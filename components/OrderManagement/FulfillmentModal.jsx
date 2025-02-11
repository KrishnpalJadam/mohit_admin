// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { EDIT_ORDER } from "@/graphql/Orders.js";
import { editOrder } from "@/redux/slices/orders.js";
import ToastStatus from "@/components/Toaster/ToastStatus";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import theme from "@/mui/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// ** Third party imports
import { useMutation } from "@apollo/client";

export default function FulfillmentModal({ closeModal, deliveryStatus }) {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const router = useRouter();

  // States
  const [content, setContent] = useState("");
  const [trackingLink, setTrackingLink] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (content === "") {
      switch (deliveryStatus) {
        case "shipped":
          setContent(
            " This action will send order shipped email to customers and also order status will change to Shipped and it can't be reverted later!"
          );
          break;
        case "outForDelivery":
          setContent(
            "Proceed if you sure that the order is out for delivery and it can't be reverted later!"
          );
          break;
        case "delivered":
          setContent(
            "This action will send delivered email to customers and also order status will change to delivered and it can't be reverted later!"
          );
          break;
        default:
          setContent("");
          break;
      }
    }
  }, [deliveryStatus]);

  const handleEditOrder = () => {
    const id = router.asPath.split("/")[2];

    if (deliveryStatus === "shipped" && trackingLink === null) {
      ToastStatus("Error", "Enter Order Tracking Link");
    } else {
      updateOrder({ variables: { id, deliveryStatus, trackingLink } });
    }
  };

  const [updateOrder, { loading }] = useMutation(EDIT_ORDER, {
    onCompleted(data) {
      if (data.editOrder?.status === 200) {
        dispatch(editOrder(data.editOrder));

        setMessage({
          message: data.editOrder.message,
          color: theme.palette.success.main,
        });

        setTimeout(() => closeModal(), [2000]);
      } else {
        setMessage({
          message: data.editOrder.message,
          color: theme.palette.error.main,
        });

        setTimeout(() => closeModal(), [2000]);
      }
    },
  });

  return (
    <Paper className={classes.confirmationModal}>
      {message && !loading && (
        <div className={classes.message}>
          <Typography
            variant="subtitle1"
            sx={{ color: message.color, mt: 1, mb: 3 }}
          >
            {message.message}
          </Typography>
        </div>
      )}
      <div style={{ visibility: message && !loading ? "hidden" : "visible" }}>
        <Typography variant="h4">Are You Sure?</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 3 }}>
          {content}
        </Typography>
        {deliveryStatus === "shipped" && (
          <TextField
            variant="outlined"
            className={classes.trackingLink}
            label="Tracking Link"
            placeholder="Enter Order Tracking Link"
            onChange={(e) => setTrackingLink(e.target.value)}
          />
        )}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <SecondaryButton
            text="Cancel"
            onClick={closeModal}
            style={{ m: 1 }}
            fullWidth={true}
          />
          <PrimaryButton
            text="Proceed"
            onClick={handleEditOrder}
            style={{ m: 1 }}
            fullWidth={true}
          />
        </div>
      </div>
    </Paper>
  );
}
