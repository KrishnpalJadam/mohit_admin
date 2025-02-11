// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOMEPAGE } from "@/graphql/Homepage.js";
import { editHomepage } from "@/redux/slices/homepage.js";
import { FormTextField } from "@/helpers/FormFields.js";
import { isRequired } from "@/helpers/FormValidators.js";
import DropzoneMultiple from "@/components/SubHero/DropzoneMultiple";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/components/SubHero/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function SubHero() {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // States
  const [initialValues, setInitialValues] = useState(null);

  // Homepage
  const homepage = useSelector((state) => state.homepage.homepage);

  useEffect(() => {
    if (homepage) {
      const subHero = {
        subHeroTitle: homepage.subHeroTitle,
        subHeroImages: homepage.subHeroImages,
        heading1: homepage.subHeroHeading?.[0],
        heading2: homepage.subHeroHeading?.[1],
        heading3: homepage.subHeroHeading?.[2],
        text1: homepage.subHeroBtnText?.[0],
        text2: homepage.subHeroBtnText?.[1],
        text3: homepage.subHeroBtnText?.[2],
        link1: homepage.subHeroLink?.[0],
        link2: homepage.subHeroLink?.[1],
        link3: homepage.subHeroLink?.[2],
      };

      setInitialValues(subHero);
    }
  }, [homepage]);

  // Updating the sub hero
  const submit = (values) => {
    const valuesObject = {
      id: homepage._id,
      subHeroTitle: values.subHeroTitle,
      subHeroImages: values.subHeroImages,
      subHeroHeading: [values.heading1, values.heading2, values.heading3],
      subHeroBtnText: [values.text1, values.text2, values.text3],
      subHeroLink: [values.link1, values.link2, values.link3],
    };

    if (valuesObject.subHeroImages.length < 3) {
      ToastStatus("Error", "Please upload three images");
    } else if (valuesObject.subHeroImages.length > 3) {
      ToastStatus("Error", "Only three images are allowed");
    } else {
      subHero({ variables: valuesObject });
    }
  };

  const [subHero, { loading }] = useMutation(HOMEPAGE, {
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
      <Seo title={"Sub Hero"} />
      <Toaster />
      <Typography variant="h4">Sub Hero:</Typography>
      <Form onSubmit={submit} initialValues={initialValues}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={classes.formField}>
              <Field
                name="subHeroTitle"
                component={FormTextField}
                validate={isRequired}
                label="Title"
              />
            </div>
            <div className={classes.formField}>
              <label>#Sub hero images</label>
              <Field name="subHeroImages" validate={isRequired}>
                {(props) => (
                  <div>
                    <DropzoneMultiple
                      {...props.input}
                      text="Recommended size: 500 x 350px"
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
            <div className={classes.formFields}>
              {[1, 2, 3].map((index) => (
                <div key={index} className={classes.formField}>
                  <Field
                    name={`link${index}`}
                    component={FormTextField}
                    validate={isRequired}
                    label={`Link ${index}`}
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
