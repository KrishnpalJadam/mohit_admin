// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SITE_SETTINGS } from "@/graphql/SiteSettings.js";
import { editSiteSettings } from "@/redux/slices/siteSettings.js";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/header-footer.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third party imports
import { useMutation } from "@apollo/client";

export default function HeaderFooterLayout() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [headerType, setHeaderType] = useState("");
  const [footerType, setFooterType] = useState("");

  // Site settings
  const siteSettings = useSelector((state) => state.siteSettings.siteSettings);

  useEffect(() => {
    if (siteSettings?.headerLayout) {
      setHeaderType(siteSettings.headerLayout);
    } else {
      setHeaderType("headerType1");
    }

    if (siteSettings?.footerLayout) {
      setFooterType(siteSettings.footerLayout);
    } else {
      setFooterType("footerType1");
    }
  }, [siteSettings]);

  // Updating the header & footer layout
  const handleChange = (e) => {
    if (e.target.value.match("headerType")) {
      setHeaderType(e.target.value);
    } else {
      setFooterType(e.target.value);
    }
  };

  const submit = () => {
    const valuesObject = {
      id: siteSettings._id,
      headerLayout: headerType,
      footerLayout: footerType,
    };

    headerFooterLayout({ variables: valuesObject });
  };

  const [headerFooterLayout, { loading }] = useMutation(SITE_SETTINGS, {
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
      <Seo title={"Header Footer Layout"} />
      <Toaster />
      <Typography variant="h4" sx={{ mb: 4 }}>
        Header & Footer layout:
      </Typography>
      <div>
        <Typography variant="h6">Select header layout:</Typography>
        <div className={classes.formField}>
          <FormControl>
            <Select
              value={headerType}
              onChange={handleChange}
              variant="outlined"
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"headerType1"}>Type 1</MenuItem>
              <MenuItem value={"headerType2"}>Type 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Typography variant="h6">Select footer layout:</Typography>
        <div className={classes.formField}>
          <FormControl>
            <Select
              value={footerType}
              onChange={handleChange}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"footerType1"}>Type 1</MenuItem>
              <MenuItem value={"footerType2"}>Type 2</MenuItem>
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
      </div>
    </Paper>
  );
}

export { getServerSideProps };
