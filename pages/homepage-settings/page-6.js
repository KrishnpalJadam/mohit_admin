// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOMEPAGE } from "@/graphql/Homepage.js";
import { editHomepage } from "@/redux/slices/homepage.js";
import { FormTextField } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isRequired,
  isValidUrl,
} from "@/helpers/FormValidators.js";
import DropzoneSingle from "@/components/ShopByCategory/DropzoneSingle";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/components/ShopByCategory/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { useMutation } from "@apollo/client";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";

export default function ShopByCategory() {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // States
  const [initialValues, setInitialValues] = useState(null);

  const FIELDS_MAX_LIMIT = 10;

  // Homepage
  const homepage = useSelector((state) => state.homepage.homepage);

  useEffect(() => {
    if (homepage) {
      const slides = homepage.categoryImages?.map((image, index) => ({
        image: image,
        heading: homepage.categoryHeading[index],
        text: homepage.categoryText[index],
        link: homepage.categoryLink[index],
      }));

      const shopByCategory = {
        categoryTitle: homepage.categoryTitle,
        slides:
          slides?.length > 0
            ? slides
            : [{ image: "", heading: "", text: "", link: "" }],
      };

      setInitialValues(shopByCategory);
    }
  }, [homepage]);

  // Updating the shop by category
  const submit = (values) => {
    const valuesObject = {
      id: homepage._id,
      categoryTitle: values.categoryTitle,
      categoryImages: values.slides.map((slide) => slide.image),
      categoryHeading: values.slides.map((slide) => slide.heading),
      categoryText: values.slides.map((slide) => slide.text),
      categoryLink: values.slides.map((slide) => slide.link),
    };

    if (values.slides?.length < 4) {
      ToastStatus("Error", "Atleast four slides required!");
    } else {
      shopByCategory({ variables: valuesObject });
    }
  };

  const [shopByCategory, { loading }] = useMutation(HOMEPAGE, {
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
      <Seo title={"Shop By Category"} />
      <Toaster />
      <Typography variant="h4">Shop By Category:</Typography>
      <Form
        onSubmit={submit}
        initialValues={initialValues}
        mutators={{
          ...arrayMutators,
        }}
      >
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={classes.formField}>
              <Field
                name="categoryTitle"
                component={FormTextField}
                validate={isRequired}
                label="Title"
              />
            </div>
            <FieldArray name="slides">
              {({ fields }) => (
                <>
                  {fields.map((name, index) => (
                    <div key={index}>
                      <div className={classes.incDecBtn}>
                        <label>{"#Slider " + (index + 1)}</label>
                        <div>
                          <GrAddCircle
                            onClick={() =>
                              fields.length < FIELDS_MAX_LIMIT &&
                              fields.push({
                                image: "",
                                heading: "",
                                text: "",
                                link: "",
                              })
                            }
                          />
                          <AiOutlineMinusCircle
                            onClick={() =>
                              fields.length > 1 && fields.remove(index)
                            }
                          />
                        </div>
                      </div>
                      <div className={classes.formField}>
                        <Field name={`${name}.image`} validate={isRequired}>
                          {(props) => (
                            <div>
                              <DropzoneSingle
                                {...props.input}
                                text="Recommended size: 660 x 770px"
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className={classes.formField}>
                        <Field
                          name={`${name}.heading`}
                          component={FormTextField}
                          validate={isRequired}
                          label={"Category Heading " + `${index + 1}`}
                        />
                      </div>
                      <div className={classes.formFields}>
                        <div className={classes.formField}>
                          <Field
                            name={`${name}.text`}
                            component={FormTextField}
                            validate={isRequired}
                            label={"Category Text " + `${index + 1}`}
                          />
                        </div>
                        <div className={classes.formField}>
                          <Field
                            name={`${name}.link`}
                            component={FormTextField}
                            validate={composeValidators(isRequired, isValidUrl)}
                            label={"Category Link " + `${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>
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
