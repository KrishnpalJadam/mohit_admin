// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOMEPAGE } from "@/graphql/Homepage.js";
import { editHomepage } from "@/redux/slices/homepage.js";
import { FormTextField, FormTextArea } from "@/helpers/FormFields.js";
import { isRequired } from "@/helpers/FormValidators.js";
import MuiSwitch from "@/components/MuiSwitch/MuiSwitch";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/newsletter.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { Field, Form } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function Newsletter() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [checked, setChecked] = useState(false);

  // Homepage
  const homepage = useSelector((state) => state.homepage.homepage);

  useEffect(() => {
    if (typeof homepage?.newsletter === "boolean") {
      setChecked(homepage?.newsletter);
    }
  }, [homepage]);

  // Updating the newsletter
  const handleChange = (e) => {
    setChecked(e.target.checked);

    if (e.target.checked === false) {
      const valuesObject = {
        id: homepage._id,
        newsletter: e.target.checked,
      };

      newsletter({ variables: valuesObject });
    }
  };

  const submit = (values) => {
    const valuesObject = {
      id: homepage._id,
      newsletter: checked,
      newsletterHeading: values.newsletterHeading,
      newsletterText: values.newsletterText,
      newsletterBtnText: values.newsletterBtnText,
      newsletterSuccessHeading: values.newsletterSuccessHeading,
      newsletterSuccessText: values.newsletterSuccessText,
    };

    newsletter({ variables: valuesObject });
  };

  const [newsletter, { loading }] = useMutation(HOMEPAGE, {
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
      <Seo title={"Newsletter"} />
      <Toaster />
      <Typography variant="h4">Newsletter:</Typography>
      <div className={classes.switchContainer}>
        <Typography variant="h6">Enable / Disable Newsletter:</Typography>
        <div className={classes.switch}>
          <MuiSwitch checked={checked} onClick={handleChange} />
        </div>
      </div>
      {checked && (
        <Form onSubmit={submit} initialValues={homepage}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.formField}>
                <Field
                  name="newsletterHeading"
                  component={FormTextField}
                  validate={isRequired}
                  label="Newsletter Heading"
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="newsletterText"
                  component={FormTextArea}
                  validate={isRequired}
                  label="Newsletter Text"
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="newsletterBtnText"
                  component={FormTextField}
                  validate={isRequired}
                  label="Newsletter Button Text"
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="newsletterSuccessHeading"
                  component={FormTextField}
                  validate={isRequired}
                  label="Newsletter Success Heading"
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="newsletterSuccessText"
                  component={FormTextArea}
                  validate={isRequired}
                  label="Newsletter Success Text"
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
