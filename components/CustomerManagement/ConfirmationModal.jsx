// ** Next, React And Locals Imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CUSTOMERS } from "@/graphql/Customers.js";
import { editCustomer } from "@/redux/slices/customers.js";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import theme from "@/mui/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { useMutation } from "@apollo/client";

export default function ConfirmationModal({ id, email, action, closeModal }) {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // Success or failure message
  const [message, setMessage] = useState("");

  const handleSuspendCustomer = () => {
    if (action === "active") {
      customerStatus({ variables: { id, customerStatus: "suspended" } });
    } else {
      customerStatus({ variables: { id, customerStatus: "active" } });
    }
  };

  const [customerStatus, { loading }] = useMutation(CUSTOMERS, {
    onCompleted(data) {
      if (data.customers.status === 200) {
        dispatch(editCustomer(data.customers));

        setMessage({
          message: data.customers.message,
          color: theme.palette.success.main,
        });

        setTimeout(() => closeModal(), [2000]);
      } else {
        setMessage({
          message: data.customers.message,
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
        <Typography variant="subtitle1" sx={{ mt: 1, mb: 3 }}>
          {action === "active"
            ? "Suspending a customer will not allow them to login and place any order."
            : "This action will remove the suspension of a customer."}
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
            onClick={handleSuspendCustomer}
            style={{ m: 1 }}
            fullWidth={true}
          />
        </div>
      </div>
    </Paper>
  );
}
