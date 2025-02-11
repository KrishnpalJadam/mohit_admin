// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOMEPAGE } from "@/graphql/Homepage.js";
import { editHomepage } from "@/redux/slices/homepage.js";
import { isRequired } from "@/helpers/FormValidators.js";
import ReactDraft from "@/components/ReactDraft/ReactDraft";
import MuiSwitch from "@/components/MuiSwitch/MuiSwitch";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/marquee.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { Field, Form } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function Marquee() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [checked, setChecked] = useState(false);

  // Homepage
  const homepage = useSelector((state) => state.homepage.homepage);

  useEffect(() => {
    if (typeof homepage?.marquee === "boolean") {
      setChecked(homepage?.marquee);
    }
  }, [homepage]);

  // Updating the marquee
  const handleChange = (e) => {
    setChecked(e.target.checked);

    if (e.target.checked === false) {
      const valuesObject = {
        id: homepage._id,
        marquee: e.target.checked,
      };

      marquee({ variables: valuesObject });
    }
  };

  const submit = (values) => {
    const valuesObject = {
      id: homepage._id,
      marquee: checked,
      marqueeText: values.marqueeText,
    };

    if (valuesObject.marqueeText?.length > 15) {
      marquee({ variables: valuesObject });
    } else {
      ToastStatus("Error", "Content length is too low");
    }
  };

  const [marquee, { loading }] = useMutation(HOMEPAGE, {
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
      <Seo title={"Marquee"} />
      <Toaster />
      <Typography variant="h4">Marquee:</Typography>
      <div className={classes.switchContainer}>
        <Typography variant="h6">Enable / Disable Marquee:</Typography>
        <div className={classes.switch}>
          <MuiSwitch checked={checked} onClick={handleChange} />
        </div>
      </div>
      {checked && (
        <Form onSubmit={submit} initialValues={homepage}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.formField}>
                <Typography variant="h6">Marquee Text:</Typography>
                <Field name="marqueeText" validate={isRequired}>
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
