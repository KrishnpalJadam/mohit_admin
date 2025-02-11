// ** Next, React And Locals Imports
import React from "react";
import { FormTextField, FormTextFieldAdorn } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isNumbers,
  isRequired,
} from "@/helpers/FormValidators.js";
import DropzoneMultiple from "@/components/Products/DropzoneMultiple";
import useStyles from "./styles.js";

// ** Third party imports
import { Field } from "react-final-form";

const RenderFields = React.memo(({ type, index }) => {
  const { classes } = useStyles();

  const conditionalValidation =
    type === "variants"
      ? composeValidators(isNumbers)
      : composeValidators(isRequired, isNumbers);

  return (
    <>
      <div className={classes.formFields}>
        <div className={classes.formField}>
          <Field
            name={type === "simple" ? "images" : `variants[${index}].images`}
            validate={type === "simple" && isRequired}
          >
            {(props) => (
              <DropzoneMultiple
                {...props.input}
                text="Recommended size: 660 x 770px"
              />
            )}
          </Field>
        </div>
      </div>
      <div className={classes.formFields}>
        <div className={classes.formField}>
          <Field
            name={
              type === "simple"
                ? "regularPrice"
                : `variants[${index}].regularPrice`
            }
            component={FormTextFieldAdorn}
            adornment={process.env.NEXT_PUBLIC_STORE_CURRENCY}
            validate={conditionalValidation}
            label="Regular price"
          />
        </div>
        <div className={classes.formField}>
          <Field
            name={
              type === "simple" ? "salePrice" : `variants[${index}].salePrice`
            }
            component={FormTextFieldAdorn}
            adornment={process.env.NEXT_PUBLIC_STORE_CURRENCY}
            validate={conditionalValidation}
            label="Sale price"
            helperText={"Should be lower than or equal to regular price"}
          />
        </div>
      </div>
      <div className={classes.formFields}>
        <div className={classes.formField}>
          <Field
            name={type === "simple" ? "tax" : `variants[${index}].tax`}
            component={FormTextFieldAdorn}
            adornment={"%"}
            position={"end"}
            validate={conditionalValidation}
            label="Tax"
            helperText={"Enter 0 for no tax"}
          />
        </div>

        <div className={classes.formField}>
          <Field
            name={type === "simple" ? "stock" : `variants[${index}].stock`}
            component={FormTextField}
            validate={conditionalValidation}
            label="Stock"
            helperText={"Enter available no of stocks"}
          />
        </div>
      </div>
    </>
  );
});

export default RenderFields;
