// ** Next, React And Locals Imports
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { EDIT_ORDER } from "@/graphql/Orders.js";
import { editOrder } from "@/redux/slices/orders.js";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import theme from "@/mui/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** Third party imports
import { useMutation } from "@apollo/client";

export default function PaymentModal({ closeModal, paymentStatus }) {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const router = useRouter();

  // States
  const [message, setMessage] = useState("");

  const handleEditOrder = () => {
    const id = router.asPath.split("/")[2];

    updateOrder({ variables: { id, paymentStatus } });
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
        setTimeout(() => closeModal(), [1500]);
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
          This option is irreversible!
        </Typography>
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
