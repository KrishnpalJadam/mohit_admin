// ** Next, React And Locals Imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_SHIPPING, SHIPPING } from "@/graphql/Shipping.js";
import { getShipping, editShipping } from "@/redux/slices/shipping.js";
import { FormTextFieldAdorn } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isNumbers,
  isRequired,
} from "@/helpers/FormValidators.js";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyes from "@/styles/shipping.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { useMutation, useQuery } from "@apollo/client";

export default function Shipping() {
  const { classes } = useStyes();
  const dispatch = useDispatch();

  // Queries
  const { data: shippingData } = useQuery(GET_SHIPPING);

  useEffect(() => {
    if (shippingData?.getShipping) {
      dispatch(getShipping(shippingData.getShipping));
    }
  }, [shippingData]);

  // Shipping
  const shipping = useSelector((state) => state.shipping.shipping);

  // To Add or update the shipping details
  const submit = (values) => {
    const valuesObject = {
      id: values._id,
      fees: parseFloat(values.fees),
      minValue: parseFloat(values.minValue),
      expectedDelivery: parseFloat(values.expectedDelivery),
    };

    updateShipping({ variables: valuesObject });
  };

  const [updateShipping, { loading }] = useMutation(SHIPPING, {
    onCompleted(data) {
      if (data.shipping.status === 200) {
        dispatch(editShipping(data.shipping));

        ToastStatus("Success", data.shipping.message);
      } else {
        ToastStatus("Error", "Error Occurred");
      }
    },
  });

  return (
    <Paper className={classes.form}>
      <Seo title={"Shipping"} />
      <Toaster />
      <Typography variant="h4">Shipping Fees</Typography>
      <Form onSubmit={submit} initialValues={shipping}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={classes.formField}>
              <Field
                name="fees"
                component={FormTextFieldAdorn}
                adornment={process.env.NEXT_PUBLIC_STORE_CURRENCY}
                validate={composeValidators(isRequired, isNumbers)}
                label="Shipping Fees"
              />
            </div>
            <div className={classes.formField}>
              <Field
                name="minValue"
                component={FormTextFieldAdorn}
                adornment={process.env.NEXT_PUBLIC_STORE_CURRENCY}
                helperText={"Min value to avoid shipping fees"}
                validate={composeValidators(isRequired, isNumbers)}
                label="Min Value"
              />
            </div>
            <div className={classes.formField}>
              <Field
                name="expectedDelivery"
                component={FormTextFieldAdorn}
                adornment={"Days"}
                helperText={"Enter no.of.days will take to deliver the order"}
                position={"end"}
                validate={composeValidators(isNumbers)}
                label="Expected Delivery"
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
    </Paper>
  );
}

export { getServerSideProps };
