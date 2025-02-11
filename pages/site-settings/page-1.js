// ** Next, React And Locals Imports
import { useDispatch, useSelector } from "react-redux";
import { SITE_SETTINGS } from "@/graphql/SiteSettings.js";
import { editSiteSettings } from "@/redux/slices/siteSettings.js";
import { isRequired } from "@/helpers/FormValidators.js";
import DropzoneSingle from "@/components/WebsiteLogos/DropzoneSingle";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/components/WebsiteLogos/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function WebsiteLogos() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // Site settings
  const siteSettings = useSelector((state) => state.siteSettings.siteSettings);

  const submit = (values) => {
    const valuesObject = {
      id: siteSettings._id,
      logo: values.logo,
    };

    websiteLogos({ variables: valuesObject });
  };

  // Updating the logos
  const [websiteLogos, { loading }] = useMutation(SITE_SETTINGS, {
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
      <Seo title={"Logos"} />
      <Toaster />
      <Typography variant="h4">Logos:</Typography>
      <Form onSubmit={submit} initialValues={siteSettings}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={classes.formField}>
              <label>#Website Logo</label>
              <Field name="logo" component="input" validate={isRequired}>
                {(props) => (
                  <div>
                    <DropzoneSingle
                      {...props.input}
                      text={"Recommended Size: 250px * 60px"}
                    />
                  </div>
                )}
              </Field>
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
