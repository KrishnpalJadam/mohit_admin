// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SITE_SETTINGS } from "@/graphql/SiteSettings.js";
import { editSiteSettings } from "@/redux/slices/siteSettings.js";
import { FormSelectField } from "@/helpers/FormFields.js";
import { isRequired } from "@/helpers/FormValidators.js";
import MuiSwitch from "@/components/MuiSwitch/MuiSwitch";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import ReactDraft from "@/components/ReactDraft/ReactDraft";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/topbar.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** Mui imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { Field, Form } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function Topbar() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [checked, setChecked] = useState(false);

  // Topbar styles
  const topbarStyles = [{ value: "simple" }, { value: "marquee" }];

  // Site settings
  const siteSettings = useSelector((state) => state.siteSettings.siteSettings);

  useEffect(() => {
    if (typeof siteSettings?.topbar === "boolean") {
      setChecked(siteSettings.topbar);
    }
  }, [siteSettings]);

  // Updating the topbar
  const handleChange = (e) => {
    setChecked(e.target.checked);

    if (e.target.checked === false) {
      const valuesObject = {
        id: siteSettings._id,
        topbar: e.target.checked,
      };

      topbar({ variables: valuesObject });
    }
  };

  const submit = (values) => {
    const valuesObject = {
      id: siteSettings._id,
      topbar: checked,
      topbarContent: values.topbarContent,
      topbarStyle: values.topbarStyle,
    };

    if (valuesObject.topbarContent?.length > 15) {
      topbar({ variables: valuesObject });
    } else {
      ToastStatus("Error", "Content length is too low");
    }
  };

  const [topbar, { loading }] = useMutation(SITE_SETTINGS, {
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
      <Seo title={"Topbar"} />
      <Toaster />
      <Typography variant="h4">Topbar settings:</Typography>
      <div className={classes.switchContainer}>
        <Typography variant="h6">Enable / Disable Topbar:</Typography>
        <div className={classes.switch}>
          <MuiSwitch checked={checked} onClick={handleChange} />
        </div>
      </div>
      {checked && (
        <Form onSubmit={submit} initialValues={siteSettings}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.formField}>
                <Typography variant="h6">Topbar Content:</Typography>
                <Field name="topbarContent" validate={isRequired}>
                  {(props) => (
                    <div>
                      <ReactDraft
                        {...props.input}
                        placeholder="Write something awesome😌"
                      />
                    </div>
                  )}
                </Field>
              </div>
              <div className={classes.formField}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Choose Style:
                </Typography>
                <Field
                  name="topbarStyle"
                  component={FormSelectField}
                  options={topbarStyles}
                  label={"Style"}
                  validate={isRequired}
                  initializeValue={siteSettings?.topbarStyle}
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
