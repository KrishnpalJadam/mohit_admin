// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SITE_SETTINGS } from "@/graphql/SiteSettings.js";
import { editSiteSettings } from "@/redux/slices/siteSettings.js";
import { composeValidators, isRequired } from "@/helpers/FormValidators.js";
import { FormTextArea } from "@/helpers/FormFields.js";
import MuiSwitch from "@/components/MuiSwitch/MuiSwitch";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/sold-in-last.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** Mui imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { useMutation } from "@apollo/client";
import { Field, Form } from "react-final-form";

export default function SoldInLast() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [checked, setChecked] = useState(false);

  // Site settings
  const siteSettings = useSelector((state) => state.siteSettings.siteSettings);

  useEffect(() => {
    if (siteSettings.soldInLast) {
      setChecked(siteSettings.soldInLast);
    }
  }, [siteSettings]);

  // Updating the sold in last
  const handleChange = (e) => {
    setChecked(e.target.checked);

    if (e.target.checked === false) {
      const valuesObject = {
        id: siteSettings._id,
        soldInLast: e.target.checked,
      };

      soldInLast({ variables: valuesObject });
    }
  };
  const submit = (values) => {
    const valuesObject = {
      id: siteSettings._id,
      soldInLast: checked,
      soldInLastProducts: values.soldInLastProducts,
      soldInLastHours: values.soldInLastHours,
    };

    soldInLast({ variables: valuesObject });
  };

  const [soldInLast, { loading }] = useMutation(SITE_SETTINGS, {
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
      <Seo title={"Sold In Last"} />
      <Toaster />
      <Typography variant="h4">Sold In Last:</Typography>
      <div className={classes.switchContainer}>
        <Typography variant="h6">Enable / Disable:</Typography>
        <div className={classes.switch}>
          <MuiSwitch checked={checked} onClick={handleChange} />
        </div>
      </div>
      {checked && (
        <Form onSubmit={submit} initialValues={siteSettings}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.formField}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Enter Product Numbers:
                </Typography>
                <Field
                  name="soldInLastProducts"
                  component={FormTextArea}
                  validate={composeValidators(isRequired)}
                  label={"Enter products numbers"}
                  rows={4}
                  required={true}
                  helperText="Eg: 3,7,10,11,18,23 - Add 15 - 25 numbers"
                />
              </div>
              <div className={classes.formField}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Enter Hours:
                </Typography>
                <Field
                  name="soldInLastHours"
                  component={FormTextArea}
                  validate={composeValidators(isRequired)}
                  label={"Enter hours"}
                  rows={4}
                  required={true}
                  helperText="Eg: 5,20,18,11,23,57 - Add 15 - 25 numbers"
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
