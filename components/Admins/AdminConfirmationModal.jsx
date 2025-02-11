// ** Next, React And Locals Imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_ADMIN } from "@/graphql/Admins.js";
import { removeAdmin } from "@/redux/slices/admins.js";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import theme from "@/mui/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { useMutation } from "@apollo/client";

export default function AdminConfirmationModal({ id, closeModal }) {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // Success or failure message
  const [message, setMessage] = useState("");

  const handleDeleteAdmin = () => {
    deleteAdmin({ variables: { id } });
  };

  const [deleteAdmin, { loading }] = useMutation(DELETE_ADMIN, {
    onCompleted(data) {
      if (data.deleteAdmin.status === 200) {
        dispatch(removeAdmin(data.deleteAdmin._id));
        setMessage({
          message: data.deleteAdmin.message,
          color: theme.palette.success.main,
        });
        setTimeout(() => closeModal(), [2000]);
      } else {
        setMessage({
          message: data.deleteAdmin.message,
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
            onClick={handleDeleteAdmin}
            style={{ m: 1 }}
            fullWidth={true}
          />
        </div>
      </div>
    </Paper>
  );
}
