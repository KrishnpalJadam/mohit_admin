// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOMEPAGE } from "@/graphql/Homepage.js";
import { editHomepage } from "@/redux/slices/homepage.js";
import { FormTextField } from "@/helpers/FormFields.js";
import { isRequired } from "@/helpers/FormValidators.js";
import DropzoneMultiple from "@/components/RiskReducers/DropzoneMultiple";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/components/RiskReducers/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function RiskReducers() {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // States
  const [initialValues, setInitialValues] = useState(null);

  // Homepage
  const homepage = useSelector((state) => state.homepage.homepage);

  useEffect(() => {
    if (homepage) {
      const riskReducers = {
        riskReducersImages: homepage.riskReducersImages,
        heading1: homepage.riskReducersHeading?.[0],
        heading2: homepage.riskReducersHeading?.[1],
        heading3: homepage.riskReducersHeading?.[2],
        text1: homepage.riskReducersText?.[0],
        text2: homepage.riskReducersText?.[1],
        text3: homepage.riskReducersText?.[2],
      };

      setInitialValues(riskReducers);
    }
  }, [homepage]);

  // Updating the risk reducers
  const submit = (values) => {
    const valuesObject = {
      id: homepage._id,
      riskReducersImages: values.riskReducersImages,
      riskReducersHeading: [values.heading1, values.heading2, values.heading3],
      riskReducersText: [values.text1, values.text2, values.text3],
    };

    if (valuesObject.riskReducersImages.length < 3) {
      ToastStatus("Error", "Please upload three images");
    } else if (valuesObject.riskReducersImages.length > 3) {
      ToastStatus("Error", "Only three images are allowed");
    } else {
      riskReducers({ variables: valuesObject });
    }
  };

  const [riskReducers, { loading }] = useMutation(HOMEPAGE, {
    onCompleted(data) {
      if (data.homepage.status === 200) {
        dispatch(editHomepage(data.homepage));

        ToastStatus("Success", data.homepage.message);
      } else {
        ToastStatus("Error", data.homepage.message);
      }
    },
  });

  return (
    <Paper className={classes.form}>
      <Seo title={"Risk Reducers"} />
      <Toaster />
      <Typography variant="h4">Risk Reducers:</Typography>
      <Form onSubmit={submit} initialValues={initialValues}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={classes.formField}>
              <label>#Risk reducers images</label>
              <Field name="riskReducersImages" validate={isRequired}>
                {(props) => (
                  <div>
                    <DropzoneMultiple
                      {...props.input}
                      text="Recommended size: 512 x 512px"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className={classes.formFields}>
              {[1, 2, 3].map((index) => (
                <div key={index} className={classes.formField}>
                  <Field
                    name={`heading${index}`}
                    component={FormTextField}
                    validate={isRequired}
                    label={`Heading ${index}`}
                  />
                </div>
              ))}
            </div>
            <div className={classes.formFields}>
              {[1, 2, 3].map((index) => (
                <div key={index} className={classes.formField}>
                  <Field
                    name={`text${index}`}
                    component={FormTextField}
                    validate={isRequired}
                    label={`Text ${index}`}
                  />
                </div>
              ))}
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
