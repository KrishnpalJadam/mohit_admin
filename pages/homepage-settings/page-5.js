// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOMEPAGE } from "@/graphql/Homepage.js";
import { editHomepage } from "@/redux/slices/homepage.js";
import { FormTextField } from "@/helpers/FormFields.js";
import { isRequired } from "@/helpers/FormValidators.js";
import MuiSwitch from "@/components/MuiSwitch/MuiSwitch";
import DropzoneSingle from "@/components/Spotlight/DropzoneSingle";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/components/Spotlight/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { Field, Form } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function Spotlight() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [spotlight1, setSpotlight1] = useState(null);
  const [spotlight2, setSpotlight2] = useState(null);

  // Homepage
  const homepage = useSelector((state) => state.homepage.homepage);

  useEffect(() => {
    if (typeof homepage?.spotlight1 === "boolean") {
      setSpotlight1(homepage?.spotlight1);
    }

    if (typeof homepage?.spotlight2 === "boolean") {
      setSpotlight2(homepage?.spotlight2);
    }
  }, [homepage]);

  // Spotlight fields
  const spotlightFields = (index) => {
    return (
      <>
        <div className={classes.formField}>
          <label>#Spotlight {index} Image</label>
          <Field name={`spotlight${index}Image`} validate={isRequired}>
            {(props) => (
              <div>
                <DropzoneSingle
                  {...props.input}
                  text="Recommended aspect ratio: 16:6"
                />
              </div>
            )}
          </Field>
        </div>
        <div className={classes.formField}>
          <Field
            name={`spotlight${index}Link`}
            component={FormTextField}
            validate={isRequired}
            label={`Spotlight ${index} Link`}
          />
        </div>
      </>
    );
  };

  // Updating the spotlight
  const submit = (values) => {
    const valuesObject = {
      id: values._id,
      spotlight1: spotlight1,
      spotlight1Image: values.spotlight1Image,
      spotlight1Link: values.spotlight1Link,
      spotlight2: spotlight2,
      spotlight2Image: values.spotlight2Image,
      spotlight2Link: values.spotlight2Link,
    };

    spotlight({ variables: valuesObject });
  };

  const [spotlight, { loading }] = useMutation(HOMEPAGE, {
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
      <Seo title={"Spotlight"} />
      <Toaster />
      <Typography variant="h4">Spotlight:</Typography>
      <Form onSubmit={submit} initialValues={homepage}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/* Spotlight 1 */}
            <div className={classes.switchContainer}>
              <Typography variant="h6">
                Enable / Disable Spotlight 1:
              </Typography>
              <div className={classes.switch}>
                <MuiSwitch
                  checked={spotlight1}
                  onClick={() => setSpotlight1(!spotlight1)}
                />
              </div>
            </div>
            {spotlight1 && spotlightFields(1)}
            {/* Spotlight 2 */}
            <div className={classes.switchContainer}>
              <Typography variant="h6">
                Enable / Disable Spotlight 2:
              </Typography>
              <div className={classes.switch}>
                <MuiSwitch
                  checked={spotlight2}
                  onClick={() => setSpotlight2(!spotlight2)}
                />
              </div>
            </div>
            {spotlight2 && spotlightFields(2)}
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
