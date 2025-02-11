// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOMEPAGE } from "@/graphql/Homepage.js";
import { editHomepage } from "@/redux/slices/homepage.js";
import { FormTextField, FormTextFieldAdorn } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isNumbers,
  isRequired,
  isValidUrl,
} from "@/helpers/FormValidators.js";
import DropzoneMultiple from "@/components/Hero/DropzoneMultiple";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/components/Hero/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** Mui imports
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { Field, Form } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function Hero() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [heroType, setHeroType] = useState("");
  const [initialValues, setInitialValues] = useState(null);

  // Homepage
  const homepage = useSelector((state) => state.homepage.homepage);

  useEffect(() => {
    const initialCountDownTimer = (ms) => {
      const milliSeconds = parseInt(ms) - new Date().getTime();

      const hoursLeft = Math.floor(milliSeconds / (1000 * 60 * 60));

      if (hoursLeft < 1) {
        return 0;
      }

      return hoursLeft;
    };

    if (homepage) {
      const hero = {
        heroImagesLarge: homepage.heroImagesLarge,
        heroImagesSmall: homepage.heroImagesSmall,
        heroHeading: homepage.heroHeading,
        heroSubHeading: homepage.heroSubHeading,
        heroBtnText: homepage.heroBtnText,
        heroLink: homepage.heroLink,
        heroCountdown: initialCountDownTimer(homepage.heroCountdown),
        heroCountdownText: homepage.heroCountdownText,
      };

      setInitialValues(hero);

      // Setting hero type
      if (homepage.heroType && heroType === "") {
        setHeroType(homepage.heroType);
      }
    }
  }, [homepage, heroType]);

  // Handle heroType
  const handleChange = (e) => {
    setHeroType(e.target.value);
  };

  // Updating the hero
  const submit = (values) => {
    const countDownTimer = (hours) => {
      const hoursData = hours * 60 * 60 * 1000;
      const currentDate = new Date().getTime();

      return hoursData + currentDate;
    };

    const valuesObject = {
      id: homepage._id,
      heroType,
      heroImagesLarge: values.heroImagesLarge,
      heroImagesSmall: values.heroImagesSmall,
      heroHeading: values.heroHeading,
      heroSubHeading: values.heroSubHeading,
      heroBtnText: values.heroBtnText,
      heroLink: values.heroLink,
      heroCountdown: countDownTimer(values.heroCountdown),
      heroCountdownText: values.heroCountdownText,
    };

    // Validation
    if (heroType === "heroType3") {
      const largeImageCount = valuesObject.heroImagesLarge.length;
      const smallImageCount = valuesObject.heroImagesSmall.length;

      if (largeImageCount < 3) {
        ToastStatus("Error", "Please upload three large images");
      } else if (largeImageCount > 5) {
        ToastStatus("Error", "Only five large images are allowed");
      } else if (smallImageCount < 3) {
        ToastStatus("Error", "Please upload three small images");
      } else if (smallImageCount > 5) {
        ToastStatus("Error", "Only five small images are allowed");
      } else {
        hero({ variables: valuesObject });
      }
    } else {
      hero({ variables: valuesObject });
    }
  };

  const [hero, { loading }] = useMutation(HOMEPAGE, {
    onCompleted(data) {
      if (data.homepage.status === 200) {
        dispatch(editHomepage(data.homepage));

        ToastStatus("Success", data.homepage.message);
      } else {
        ToastStatus("Error", "Error occurred");
      }
    },
  });

  return (
    <Paper className={classes.form}>
      <Seo title={"Hero"} />
      <Toaster />
      <Typography variant="h4">Hero:</Typography>
      <div className={classes.selectLayout}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Hero Layout:
        </Typography>
        <Select
          value={heroType}
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"heroType1"}>Type 1</MenuItem>
          <MenuItem value={"heroType2"}>Type 2</MenuItem>
          <MenuItem value={"heroType3"}>Type 3</MenuItem>
        </Select>
      </div>
      <Form onSubmit={submit} initialValues={initialValues}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={classes.formField}>
              <label>#hero images (large)</label>
              <Field name="heroImagesLarge" validate={isRequired}>
                {(props) => (
                  <div>
                    <DropzoneMultiple
                      {...props.input}
                      text="Recommended size: 1400 x 525 px"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className={classes.formField}>
              <label>#hero images (small)</label>
              <Field name="heroImagesSmall" validate={isRequired}>
                {(props) => (
                  <div>
                    <DropzoneMultiple
                      {...props.input}
                      text="Recommended size: 600 x 750 px"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="heroHeading"
                  component={FormTextField}
                  validate={heroType === "heroType1" && isRequired}
                  label="Hero Heading"
                  disabled={heroType !== "heroType1"}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="heroSubHeading"
                  component={FormTextField}
                  validate={heroType === "heroType1" && isRequired}
                  label="Hero Sub Heading"
                  disabled={heroType !== "heroType1"}
                />
              </div>
            </div>
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="heroBtnText"
                  component={FormTextField}
                  validate={heroType !== "heroType3" && isRequired}
                  label="Hero Button Text"
                  disabled={heroType === "heroType3"}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="heroLink"
                  component={FormTextField}
                  validate={composeValidators(isRequired, isValidUrl)}
                  label="Hero Link"
                />
              </div>
            </div>
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="heroCountdown"
                  component={FormTextFieldAdorn}
                  adornment={
                    initialValues?.heroCountdown ? "Hours Left" : "Hours"
                  }
                  position={"end"}
                  validate={
                    heroType === "heroType2" &&
                    composeValidators(isRequired, isNumbers)
                  }
                  label="Hero Countdown Timer"
                  disabled={heroType !== "heroType2"}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="heroCountdownText"
                  component={FormTextField}
                  validate={heroType === "heroType2" && isRequired}
                  label="Hero Countdown Text"
                  disabled={heroType !== "heroType2"}
                />
              </div>
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
