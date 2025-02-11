// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOMEPAGE } from "@/graphql/Homepage.js";
import { editHomepage } from "@/redux/slices/homepage.js";
import MuiSwitch from "@/components/MuiSwitch/MuiSwitch";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import CustomImage from "@/components/Image/CustomImage";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/trending-products.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** Mui imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { useMutation } from "@apollo/client";
import { BsPlusLg } from "react-icons/bs";
import { HiOutlineMinus } from "react-icons/hi";

export default function TrendingProducts() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [checked, setChecked] = useState(false);
  const [limit, setLimit] = useState(0);

  // Homepage
  const homepage = useSelector((state) => state.homepage.homepage);

  useEffect(() => {
    if (typeof homepage?.trending === "boolean") {
      setChecked(homepage?.trending);
    }

    if (homepage?.trendingLimit) {
      setLimit(homepage?.trendingLimit);
    }
  }, [homepage]);

  // To handle increment and decrement
  const handleIncrement = () => {
    if (limit > 7) {
      ToastStatus("Error", "Maximum limit is 8 only");
    } else {
      setLimit(limit + 1);
    }
  };

  const handleDecrement = () => {
    if (limit === 0) {
      setLimit(limit);
    } else {
      setLimit(limit - 1);
    }
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);

    if (e.target.checked === false) {
      const valuesObject = {
        id: homepage._id,
        trending: e.target.checked,
      };

      trendingProducts({ variables: valuesObject });
    }
  };

  // Setting trending products
  const submit = () => {
    const valuesObject = {
      id: homepage._id,
      trending: checked,
      trendingLimit: limit,
    };

    if (limit > 3) {
      trendingProducts({ variables: valuesObject });
    } else {
      ToastStatus("Error", "Set limit atleast 4 to proceed");
    }
  };

  const [trendingProducts, { loading }] = useMutation(HOMEPAGE, {
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
      <Seo title={"Trending Products"} />
      <Toaster />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Trending Products:
      </Typography>
      <div className={classes.switchContainer}>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Enable / Disable Trending Products:
        </Typography>
        <div className={classes.switch}>
          <MuiSwitch checked={checked} onClick={handleChange} />
        </div>
      </div>
      {checked && (
        <>
          <div className={classes.formFields}>
            <div className={classes.formField}>
              <div className={classes.trendingContainer}>
                <CustomImage
                  src={"/assets/trendingProducts.png"}
                  alt="trending product"
                  width={50}
                  height={50}
                />
                <Typography className={classes.limitText}>{limit}</Typography>
              </div>
            </div>
            <div className={classes.formField}>
              <div className={classes.limitBtn} onClick={handleIncrement}>
                <BsPlusLg />
              </div>
              <div className={classes.limitBtn} onClick={handleDecrement}>
                <HiOutlineMinus />
              </div>
            </div>
          </div>
          <div className={classes.actionBtn}>
            <PrimaryButton
              type="submit"
              text="Save"
              onClick={submit}
              spinner={loading}
            />
          </div>
        </>
      )}
    </Paper>
  );
}

export { getServerSideProps };
