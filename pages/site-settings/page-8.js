// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SITE_SETTINGS } from "@/graphql/SiteSettings.js";
import { editSiteSettings } from "@/redux/slices/siteSettings.js";
import { FormTextField, FormTextFieldAdorn } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isNumbers,
  isRequired,
} from "@/helpers/FormValidators.js";
import MuiSwitch from "@/components/MuiSwitch/MuiSwitch";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/countdown.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** Mui imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { useMutation } from "@apollo/client";
import { Field, Form } from "react-final-form";

export default function Countdown() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [checked, setChecked] = useState(false);

  // Site settings
  const siteSettings = useSelector((state) => state.siteSettings.siteSettings);

  useEffect(() => {
    if (siteSettings.countdown) {
      setChecked(siteSettings.countdown);
    }
  }, [siteSettings]);

  // To initialize countdown
  const initialCountDownTimer = (ms) => {
    const milliSeconds = parseInt(ms) - new Date().getTime();

    const hoursLeft = Math.floor(milliSeconds / (1000 * 60 * 60));

    if (hoursLeft < 1) {
      return 0;
    }

    return hoursLeft;
  };

  // Updating the countdown
  const handleChange = (e) => {
    setChecked(e.target.checked);

    if (e.target.checked === false) {
      const valuesObject = {
        id: siteSettings._id,
        countdown: e.target.checked,
      };

      countdown({ variables: valuesObject });
    }
  };

  const submit = (values) => {
    const countDownTimer = (hours) => {
      const hoursData = hours * 60 * 60 * 1000;
      const currentDate = new Date().getTime();

      return hoursData + currentDate;
    };

    const valuesObject = {
      id: siteSettings._id,
      countdown: checked,
      countdownTimer: parseFloat(countDownTimer(values.countdownTimer)),
      countdownText: values.countdownText,
    };

    countdown({ variables: valuesObject });
  };

  const [countdown, { loading }] = useMutation(SITE_SETTINGS, {
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
      <Seo title={"Countdown"} />
      <Toaster />
      <Typography variant="h4">Countdown:</Typography>
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
                <Field
                  name="countdownTimer"
                  component={FormTextFieldAdorn}
                  adornment={siteSettings.countdown ? "Hours Left" : "Hours"}
                  position={"end"}
                  validate={composeValidators(isRequired, isNumbers)}
                  label="Countdown Timer"
                  initialValue={initialCountDownTimer(
                    siteSettings.countdownTimer
                  )}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="countdownText"
                  component={FormTextField}
                  label="Countdown Text"
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
