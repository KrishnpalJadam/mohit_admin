// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SITE_SETTINGS } from "@/graphql/SiteSettings.js";
import { editSiteSettings } from "@/redux/slices/siteSettings.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/payment-methods.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** Mui imports
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { useMutation } from "@apollo/client";

export default function PaymentMethods() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [payments, setPayments] = useState([]);

  // Site settings
  const siteSettings = useSelector((state) => state.siteSettings.siteSettings);

  // Payment methods
  const paymentMethods = ["stripe", "paypal", "cashfree", "razorpay", "cod"];

  useEffect(() => {
    if (siteSettings?.paymentMethods) {
      setPayments(siteSettings.paymentMethods);
    }
  }, [siteSettings]);

  // To handle payments checkbox change
  const handleChange = (e) => {
    if (payments?.includes(e.target.value)) {
      setPayments((payments) => {
        const payment = payments.filter((item) => {
          return item !== e.target.value;
        });

        return payment;
      });
    } else {
      setPayments([...payments, e.target.value]);
    }
  };

  // Updating the payment methods
  const submit = () => {
    const valuesObject = {
      id: siteSettings._id,
      paymentMethods: payments,
    };

    if (payments.length < 1) {
      ToastStatus("Error", "Choose atleast one payment method!");
    } else {
      updatePaymentMethods({ variables: valuesObject });
    }
  };

  const [updatePaymentMethods, { loading }] = useMutation(SITE_SETTINGS, {
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
      <Seo title={"Payment Methods"} />
      <Toaster />
      <Typography variant="h4" sx={{ mb: 3 }}>
        Payment methods:
      </Typography>
      <div>
        <Typography variant="h6">Select payment methods:</Typography>
        <div className={classes.formFields}>
          {paymentMethods.map((item, index) => (
            <div className={classes.formField} key={index}>
              <Typography variant="h6">{CapitalizeText(item)}:</Typography>
              <Checkbox
                onChange={handleChange}
                value={item}
                checked={payments?.includes(item) ? true : false}
                color="primary"
              />
            </div>
          ))}
        </div>
        <div className={classes.actionBtn}>
          <PrimaryButton
            type="submit"
            text="Save"
            onClick={submit}
            spinner={loading}
          />
        </div>
      </div>
    </Paper>
  );
}

export { getServerSideProps };
