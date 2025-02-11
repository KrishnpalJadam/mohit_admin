// ** Next, React And Locals Imports
import { useDispatch, useSelector } from "react-redux";
import { SITE_SETTINGS } from "@/graphql/SiteSettings.js";
import { editSiteSettings } from "@/redux/slices/siteSettings.js";
import { FormTextField } from "@/helpers/FormFields.js";
import {
  isValidEmail,
  isValidUrl,
  isMobileNumber,
} from "@/helpers/FormValidators.js";
import SocialsFilter from "@/helpers/SocialsFilter.js";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/socials.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function Socials() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // Site settings
  const siteSettings = useSelector((state) => state.siteSettings.siteSettings);

  // Initialize social values
  const initialValues = SocialsFilter(siteSettings?.socials);

  // Updating the social media urls
  const submit = (values) => {
    const valuesArray = Object.values(values);

    const valuesObject = {
      id: siteSettings._id,
      socials: valuesArray,
    };

    socials({ variables: valuesObject });
  };

  const [socials, { loading }] = useMutation(SITE_SETTINGS, {
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
      <Seo title={"Socials"} />
      <Toaster />
      <Typography variant="h4">Socials:</Typography>
      <Form onSubmit={submit} initialValues={initialValues}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={classes.formField}>
              <Field
                name="email"
                component={FormTextField}
                label="Email"
                validate={isValidEmail}
              />
            </div>
            <div className={classes.formField}>
              <Field
                name="youtubeUrl"
                component={FormTextField}
                label="Youtube Url"
                validate={isValidUrl}
              />
            </div>
            <div className={classes.formField}>
              <Field
                name="instagramUrl"
                component={FormTextField}
                label="Instagram Url"
                validate={isValidUrl}
              />
            </div>
            <div className={classes.formField}>
              <Field
                name="facebookUrl"
                component={FormTextField}
                label="Facebook Url"
                validate={isValidUrl}
              />
            </div>
            <div className={classes.formField}>
              <Field
                name="twitterUrl"
                component={FormTextField}
                label="Twitter Url"
                validate={isValidUrl}
              />
            </div>
            <div className={classes.formField}>
              <Field
                name="mobileNumber"
                component={FormTextField}
                label="Mobile Number"
                validate={isMobileNumber}
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
