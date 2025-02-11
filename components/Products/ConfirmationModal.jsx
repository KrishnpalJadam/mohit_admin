// ** Next, React And Locals Imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_PRODUCT } from "@/graphql/Products.js";
import { removeProduct } from "@/redux/slices/products.js";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import theme from "@/mui/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { useMutation } from "@apollo/client";

export default function ConfirmationModal({ id, closeModal }) {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // Success or failure message
  const [message, setMessage] = useState("");

  const handleDeleteProduct = () => {
    deleteProduct({ variables: { id } });
  };

  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    onCompleted(data) {
      if (data.deleteProduct.status === 200) {
        dispatch(removeProduct(data.deleteProduct._id));
        setMessage({
          message: data.deleteProduct.message,
          color: theme.palette.success.main,
        });
        setTimeout(() => closeModal(), [2000]);
      } else {
        setMessage({
          message: data.deleteProduct.message,
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
          This option is not reversible
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
            onClick={handleDeleteProduct}
            style={{ m: 1 }}
            fullWidth={true}
          />
        </div>
      </div>
    </Paper>
  );
}
