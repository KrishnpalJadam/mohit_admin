// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COUPONS } from "@/graphql/Coupons.js";
import { addCoupon, editCoupon } from "@/redux/slices/coupons.js";
import {
  FormTextField,
  FormTextFieldAdorn,
  FormSelectField,
  FormDesktopDatePicker,
  FormMobileDatePicker,
} from "@/helpers/FormFields.js";
import {
  composeValidators,
  isNumbers,
  isRequired,
} from "@/helpers/FormValidators.js";
import MuiSwitch from "@/components/MuiSwitch/MuiSwitch";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyes from "./styles.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { useMutation } from "@apollo/client";
import { MdClose } from "react-icons/md";

export default function AddCoupon({ id, modal }) {
  const dispatch = useDispatch();
  const { classes } = useStyes();

  // States
  const [coupon, setCoupon] = useState(null);
  const [checked, setChecked] = useState(false);

  // Coupons
  const couponsData = useSelector((state) => state.coupons.coupons);

  useEffect(() => {
    if (couponsData) {
      const coupon = couponsData.find((coupon) => {
        return coupon._id === id;
      });

      if (coupon) {
        setCoupon(coupon);
        setChecked(coupon.isEnabled);
      }
    }
  }, [couponsData]);

  // To add or edit the coupon
  const submit = (values) => {
    const valuesObject = {
      id: values._id,
      couponCode: values.couponCode,
      couponType: values.couponType,
      discount: parseFloat(values.discount),
      limitPerUser: parseFloat(values.limitPerUser),
      maxValue: parseFloat(values.maxValue) || 0,
      minValue: parseFloat(values.minValue),
      validFrom: values.validFrom.toString(),
      validTo: values.validTo.toString(),
      isEnabled: checked,
    };

    addOrEditCoupon({ variables: valuesObject });
  };

  const [addOrEditCoupon, { loading }] = useMutation(COUPONS, {
    onCompleted(data) {
      if (data.coupons.status === 200) {
        id
          ? dispatch(editCoupon(data.coupons))
          : dispatch(addCoupon(data.coupons));

        ToastStatus("Success", data.coupons.message);

        // Modal will close after the timeout
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        ToastStatus("Error", data.coupons.message);
      }
    },
  });

  const closeModal = () => {
    modal();
  };

  const handleSwitch = (e) => {
    setChecked(e.target.checked);
  };

  // Coupon types
  const couponTypes = [
    {
      label: "First Time Purchase",
      value: "firstTimePurchase",
    },
    {
      label: "Discount",
      value: "discount",
    },
  ];

  return (
    <Paper className={classes.form}>
      <Seo title={"Add Coupon"} />
      <div className={classes.closeIcon}>
        <MdClose onClick={closeModal} />
      </div>
      <Typography variant="h4">
        {id ? "Update a coupon" : "Create a coupon"}
      </Typography>
      <Form onSubmit={submit} initialValues={coupon}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="couponCode"
                  component={FormTextField}
                  validate={isRequired}
                  label="Coupon Code"
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="couponType"
                  component={FormSelectField}
                  label={"Select Coupon Type"}
                  options={couponTypes}
                  validate={isRequired}
                  initializeValue={coupon?.couponType}
                />
              </div>
            </div>
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="minValue"
                  component={FormTextFieldAdorn}
                  adornment={process.env.NEXT_PUBLIC_STORE_CURRENCY}
                  validate={composeValidators(isRequired, isNumbers)}
                  label="Min Value"
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="maxValue"
                  component={FormTextFieldAdorn}
                  adornment={process.env.NEXT_PUBLIC_STORE_CURRENCY}
                  validate={composeValidators(isNumbers)}
                  label="Max Value"
                />
              </div>
            </div>
            <div>
              {/* Desktop Date Picker */}
              <div
                className={`${classes.formFields} ${classes.desktopDatePicker}`}
              >
                <div className={classes.formField}>
                  <Field
                    name="validFrom"
                    component={FormDesktopDatePicker}
                    validate={isRequired}
                    label="Valid From"
                  />
                </div>
                <div className={classes.formField}>
                  <Field
                    name="validTo"
                    component={FormDesktopDatePicker}
                    validate={isRequired}
                    label="Valid To"
                  />
                </div>
              </div>
              {/* Mobile Date Picker */}
              <div
                className={`${classes.formFields} ${classes.mobileDatePicker}`}
              >
                <div className={classes.formField}>
                  <Field
                    name="validFrom"
                    component={FormMobileDatePicker}
                    validate={isRequired}
                    label="Valid From"
                  />
                </div>
                <div className={classes.formField}>
                  <Field
                    name="validTo"
                    component={FormMobileDatePicker}
                    validate={isRequired}
                    label="Valid To"
                  />
                </div>
              </div>
            </div>
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="limitPerUser"
                  component={FormTextField}
                  validate={composeValidators(isRequired, isNumbers)}
                  label="Limit Per User"
                  helperText={"Enter '1' for First Time Purchase Type"}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="discount"
                  component={FormTextFieldAdorn}
                  adornment={process.env.NEXT_PUBLIC_STORE_CURRENCY}
                  validate={composeValidators(isRequired, isNumbers)}
                  label="Discount"
                />
              </div>
            </div>
            <div className={classes.switchContainer}>
              <Typography variant="h6">Enable Coupon:</Typography>
              <div className={classes.switch}>
                <MuiSwitch checked={checked} onClick={handleSwitch} />
              </div>
            </div>
            <div className={classes.actionBtn}>
              <PrimaryButton
                type="submit"
                text={id ? "Update" : "Save"}
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
