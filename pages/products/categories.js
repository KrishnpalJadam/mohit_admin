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
import { FormTextField } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isText,
  isRequired,
} from "@/helpers/FormValidators.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import MuiPagination from "@/components/MuiPagination/MuiPagination";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/product-categories.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { useMutation, useQuery } from "@apollo/client";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

export default function ProductCategories() {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // States
  const [existingCategory, setExistingCategory] = useState(null);

  const initialValue = {
    category: existingCategory,
  };

  // Queries
  const productSettingsQuery = useQuery(GET_PRODUCT_SETTINGS);

  useEffect(() => {
    const productSettingsData = productSettingsQuery?.data?.getProductSettings;

    if (productSettingsData) {
      dispatch(getProductSettings(productSettingsData));
    }
  }, [productSettingsQuery]);

  // Product settings (categories)
  const productSettings = useSelector(
    (state) => state.productSettings.productSettings
  );

  const categories = productSettings?.categories;

  // Table columns
  const columns = [
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 300,
      renderCell: (params) => {
        return CapitalizeText(params.row);
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <IconButton>
              <Tooltip title="Edit Category" arrow>
                <span>
                  <FiEdit2 onClick={() => handleEdit(params.row)} />
                </span>
              </Tooltip>
            </IconButton>
            <IconButton>
              <Tooltip title="Delete Category" arrow>
                <span>
                  <AiOutlineDelete onClick={() => handleDelete(params.row)} />
                </span>
              </Tooltip>
            </IconButton>
          </div>
        );
      },
    },
  ];

  // Edit category
  const handleEdit = (row) => {
    setExistingCategory(row);
  };

  // To handle category add or edit
  const submit = (values) => {
    let variables;

    // Edit category
    if (existingCategory) {
      const filteredCategories = categories
        ? categories.filter((item) => {
            return item !== existingCategory;
          })
        : [];

      filteredCategories.push(values.category.toLowerCase());

      variables = {
        id: productSettings._id,
        categories: filteredCategories,
      };
    } else {
      const categoriesList = categories ? [...categories] : [];

      categoriesList.push(values.category.toLowerCase());

      variables = {
        id: productSettings._id,
        categories: categoriesList,
      };
    }
    productCategories({ variables });
  };

  // Delete category
  const handleDelete = (row) => {
    const filteredCategories = categories.filter((category) => {
      return category !== row;
    });

    const valuesObject = {
      id: productSettings._id,
      categories: filteredCategories,
    };

    productCategories({ variables: valuesObject });
  };

  const [productCategories, { loading }] = useMutation(PRODUCT_SETTINGS, {
    onCompleted(data) {
      if (data.productSettings.status === 200) {
        dispatch(editProductSettings(data.productSettings));
        setExistingCategory(null);

        ToastStatus("Success", data.productSettings.message);
      } else {
        ToastStatus("Error", data.productSettings.message);
      }
    },
  });

  return (
    <Paper className={classes.tableContainer}>
      <Seo title={"Product Categories"} />
      <Toaster />
      <Form onSubmit={submit} initialValues={initialValue}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Typography variant="h4">Add Product Category:</Typography>
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="category"
                  component={FormTextField}
                  validate={composeValidators(isRequired, isText)}
                  label="Product Category"
                />
              </div>
              <div className={classes.actionBtn}>
                <PrimaryButton
                  type="submit"
                  text={existingCategory ? "Update" : "Add"}
                  disabled={invalid}
                  spinner={loading}
                />
              </div>
            </div>
          </form>
        )}
      </Form>
      <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>
        Current Categories:
      </Typography>
      {Array.isArray(categories) && (
        <DataGrid
          className={classes.table}
          rows={categories}
          columns={columns}
          getRowId={(row) => row}
          density="comfortable"
          headerHeight={60}
          rowHeight={60}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No categories found
              </Stack>
            ),
            noResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No categories found
              </Stack>
            ),
            pagination: MuiPagination,
          }}
        />
      )}
    </Paper>
  );
}

export { getServerSideProps };
