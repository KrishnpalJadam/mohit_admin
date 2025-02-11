// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRODUCT_SETTINGS,
  PRODUCT_SETTINGS,
} from "@/graphql/ProductSettings.js";
import {
  getProductSettings,
  editProductSettings,
} from "@/redux/slices/productSettings.js";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/product-cards.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { useMutation, useQuery } from "@apollo/client";

export default function ProductCardType() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [cardType, setCardType] = useState("cardType1");

  // Queries
  const productSettingsQuery = useQuery(GET_PRODUCT_SETTINGS);

  useEffect(() => {
    const productSettingsData = productSettingsQuery?.data?.getProductSettings;

    if (productSettingsData) {
      dispatch(getProductSettings(productSettingsData));
      setCardType(productSettingsData.productCardType);
    }
  }, [productSettingsQuery]);

  // Product settings
  const productSettings = useSelector(
    (state) => state.productSettings.productSettings
  );

  const handleChange = (e) => {
    setCardType(e.target.value);
  };

  const submit = () => {
    const valuesObject = {
      id: productSettings._id,
      productCardType: cardType,
    };

    productCardType({ variables: valuesObject });
  };

  // Edit product card type
  const [productCardType, { loading }] = useMutation(PRODUCT_SETTINGS, {
    onCompleted(data) {
      if (data.productSettings.status === 200) {
        dispatch(editProductSettings(data.productSettings));

        ToastStatus("Success", data.productSettings.message);
      } else {
        ToastStatus("Error", "Error Occurred");
      }
    },
  });

  return (
    <Paper className={classes.form}>
      <Seo title={"Product Card Type"} />
      <Toaster />
      <Typography variant="h4">Select product card type:</Typography>
      <div className={classes.formField}>
        <FormControl>
          <Select
            value={cardType}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"cardType1"}>Type 1</MenuItem>
            <MenuItem value={"cardType2"}>Type 2</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.actionBtn}>
        <PrimaryButton
          type="submit"
          text="Save"
          onClick={submit}
          spinner={loading}
        />
      </div>
    </Paper>
  );
}

export { getServerSideProps };
