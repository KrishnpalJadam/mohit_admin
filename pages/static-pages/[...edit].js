// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { GET_STATIC_PAGES, STATIC_PAGES } from "@/graphql/StaticPages.js";
import {
  getStaticPages,
  addStaticPage,
  editStaticPage,
} from "@/redux/slices/staticPages.js";
import { FormTextField } from "@/helpers/FormFields.js";
import { isRequired } from "@/helpers/FormValidators.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import ReactDraft from "@/components/ReactDraft/ReactDraft";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/static-pages.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { useQuery, useMutation } from "@apollo/client";

export default function EditStaticPages() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  // Page id
  const pageId = router.asPath.split("/")[3];

  // States
  const [currentPage, setCurrentPage] = useState({
    pageName: "",
    pageContent: "",
  });

  // Queries
  const staticPagesQuery = useQuery(GET_STATIC_PAGES);

  // Static pages
  const staticPagesData = useSelector((state) => state.staticPages.staticPages);

  // Setting the initial value
  useEffect(() => {
    const staticPages = staticPagesQuery?.data?.getStaticPages;

    if (staticPages && staticPagesData?.length === 0) {
      dispatch(getStaticPages(staticPages));
    }

    if (staticPagesData?.length > 0 && pageId) {
      const page = staticPagesData.find((item) => {
        return item._id === pageId;
      });

      if (page) {
        setCurrentPage(page);
      } else {
        router.push("/404");
      }
    }
  }, [staticPagesQuery, staticPagesData]);

  // To add or update the static page
  const submit = (values) => {
    const valuesObject = {
      id: values._id,
      pageName: values.pageName.replaceAll(" ", "-").toLowerCase(),
      pageContent: values.pageContent,
    };

    staticPage({
      variables: valuesObject,
    });
  };

  const [staticPage, { loading }] = useMutation(STATIC_PAGES, {
    onCompleted(data) {
      if (data.staticPages.status === 200) {
        pageId
          ? dispatch(editStaticPage(data.staticPages))
          : dispatch(addStaticPage(data.staticPages));

        ToastStatus("Success", data.staticPages.message);

        //  Modal will close after the timeout
        setTimeout(() => {
          router.push("/static-pages/all");
        }, 2000);
      } else {
        ToastStatus("Error", data.staticPages.message);
      }
    },
  });

  return (
    <Paper className={classes.form}>
      <Seo title={pageId ? "Edit Static Page" : "Add Static Page"} />
      <Toaster />
      <Typography variant="h4">
        {pageId ? "Edit Static Page" : "Add Static Page"}:{" "}
        {CapitalizeText(currentPage.pageName.replaceAll("-", " "))}
      </Typography>
      <Form onSubmit={submit} initialValues={currentPage}>
        {({ handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit}>
            <div className={classes.formField}>
              <Field
                name="pageName"
                component={FormTextField}
                label={"Page Name"}
                validate={isRequired}
              />
            </div>
            <div className={classes.formField}>
              <Field name="pageContent">
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
                text={pageId ? "Update" : "Save"}
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
