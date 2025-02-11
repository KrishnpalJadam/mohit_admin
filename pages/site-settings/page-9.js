// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SITE_SETTINGS } from "@/graphql/SiteSettings.js";
import { editSiteSettings } from "@/redux/slices/siteSettings.js";
import {
  composeValidators,
  isNumbers,
  isRequired,
} from "@/helpers/FormValidators.js";
import { FormTextFieldAdorn } from "@/helpers/FormFields.js";
import MuiSwitch from "@/components/MuiSwitch/MuiSwitch";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/hot-stock.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** Mui imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { useMutation } from "@apollo/client";
import { Field, Form } from "react-final-form";

export default function HotStock() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [checked, setChecked] = useState(false);

  // Site settings
  const siteSettings = useSelector((state) => state.siteSettings.siteSettings);

  useEffect(() => {
    if (siteSettings.hotStock) {
      setChecked(siteSettings.hotStock);
    }
  }, [siteSettings]);

  // Updating the hot stock
  const handleChange = (e) => {
    setChecked(e.target.checked);

    if (e.target.checked === false) {
      const valuesObject = {
        id: siteSettings._id,
        hotStock: e.target.checked,
      };

      hotStock({ variables: valuesObject });
    }
  };

  const submit = (values) => {
    const valuesObject = {
      id: siteSettings._id,
      hotStock: checked,
      hotStockInventoryLevel: parseFloat(values.hotStockInventoryLevel),
    };

    hotStock({ variables: valuesObject });
  };

  const [hotStock, { loading }] = useMutation(SITE_SETTINGS, {
    onCompleted(data) {
      if (data.siteSettings.status === 200) {
        dispatch(editSiteSettings(data.siteSettings));
        ToastStatus("Success", data.siteSettings.message);
      } else {
        ToastStatus("Error", data.siteSettings.message);
      }
    },
  });

  return (
    <Paper className={classes.form}>
      <Seo title={"Hot Stock"} />
      <Toaster />
      <Typography variant="h4">Hot Stock:</Typography>
      <div className={classes.switchContainer}>
        <Typography variant="h6">Enable / Disable:</Typography>
        <div className={classes.switch}>
          <MuiSwitch checked={checked} onClick={handleChange} />
        </div>
      </div>
      {checked && (
        <Form onSubmit={submit}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.formField}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Enter Maximum Inventory Level:
                </Typography>
                <Field
                  name="hotStockInventoryLevel"
                  component={FormTextFieldAdorn}
                  adornment={"Limit"}
                  position={"end"}
                  validate={composeValidators(isRequired, isNumbers)}
                  label="Inventory Level"
                  initialValue={siteSettings.hotStockInventoryLevel}
                  helperText="Eg: 20"
                />
              </div>
              <div className={classes.actionBtn}>
                <PrimaryButton
                  type="submit"
                  text="Save"
                  disabled={invalid}
                  spinner={loading}
                />
              </div>
            </form>
          )}
        </Form>
      )}
    </Paper>
  );
}

export { getServerSideProps };
