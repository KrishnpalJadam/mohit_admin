// ** Next, React And Locals Imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_PRODUCT_VARIANT } from "@/graphql/ProductSettings.js";
import { editProductSettings } from "@/redux/slices/productSettings.js";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import theme from "@/mui/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { useMutation } from "@apollo/client";

export default function VariantConfirmationModal({
  id,
  variantId,
  closeModal,
}) {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // Success or failure message
  const [message, setMessage] = useState("");

  const handleDeleteVariant = () => {
    deleteVariant({ variables: { id, variantId } });
  };

  const [deleteVariant, { loading }] = useMutation(DELETE_PRODUCT_VARIANT, {
    onCompleted(data) {
      if (data.deleteProductVariant.status === 200) {
        dispatch(editProductSettings(data.deleteProductVariant));
        setMessage({
          message: data.deleteProductVariant.message,
          color: theme.palette.success.main,
        });
        setTimeout(() => closeModal(), [2000]);
      } else {
        setMessage({
          message: data.deleteProductVariant.message,
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
            onClick={handleDeleteVariant}
            style={{ m: 1 }}
            fullWidth={true}
          />
        </div>
      </div>
    </Paper>
  );
}
