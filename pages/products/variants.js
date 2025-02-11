// ** Next, React And Locals Imports
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCT_SETTINGS } from "@/graphql/ProductSettings.js";
import { getProductSettings } from "@/redux/slices/productSettings.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import VariantConfirmationModal from "@/components/Products/VariantConfirmationModal";
import MuiPagination from "@/components/MuiPagination/MuiPagination";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import useStyes from "@/styles/product-variants.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";

// ** Third Party Imports
import { useQuery } from "@apollo/client";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

export default function ProductVariants() {
  const dispatch = useDispatch();
  const { classes } = useStyes();

  // States
  const [variants, setVariants] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Queries
  const productSettingsQuery = useQuery(GET_PRODUCT_SETTINGS);

  // Product settings (variants)
  const productSettings = useSelector(
    (state) => state.productSettings.productSettings
  );

  const variantsData = productSettings?.variants;

  useEffect(() => {
    const productSettingsData = productSettingsQuery?.data?.getProductSettings;

    if (productSettingsData) {
      dispatch(getProductSettings(productSettingsData));
    }

    setVariants(variantsData);
  }, [productSettingsQuery, variantsData]);

  // Table columns
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography variant="subtitle1">
            {CapitalizeText(params.row.name)}
          </Typography>
        );
      },
    },
    {
      field: "options",
      headerName: "Options",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography variant="subtitle1">
            {params.row.options.length}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Link href={"/products/variant_" + params.row._id}>
              <IconButton>
                <Tooltip title="Edit" arrow>
                  <span>
                    <FiEdit2 />
                  </span>
                </Tooltip>
              </IconButton>
            </Link>
            <IconButton>
              <Tooltip title="Delete" arrow>
                <span>
                  <AiOutlineDelete
                    onClick={() => handleDeleteVariant(params.row._id)}
                  />
                </span>
              </Tooltip>
            </IconButton>
          </div>
        );
      },
    },
  ];

  // Filters
  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // Search
  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = variantsData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field] && row[field].toString());
      });
    });

    setVariants(filteredRows);
  };

  // Delete admin
  const handleDeleteVariant = (id) => {
    if (id?.length === 24) {
      setConfirmationModal(id);
    } else {
      setConfirmationModal(null);
    }
  };

  return (
    <div className={classes.tableContainer}>
      <Seo title={"Product variants"} />
      <Toaster />
      <div className={classes.tableTop}>
        <Typography variant="h4">Product Variants</Typography>
        <PrimaryButton
          type="submit"
          text="Add Variant"
          href={"/products/add-variant"}
        />
      </div>
      <div className={classes.searchFilter}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={classes.filter}
        >
          <TextField
            label="Search variant..."
            type="search"
            variant="outlined"
            onChange={(e) => {
              requestSearch(e.target.value);
            }}
          />
        </Box>
      </div>
      {Array.isArray(variants) && (
        <DataGrid
          className={classes.table}
          rows={variants}
          columns={columns}
          getRowId={(row) => row._id}
          density="comfortable"
          headerHeight={50}
          rowHeight={80}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No variants found
              </Stack>
            ),
            noResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No variants found
              </Stack>
            ),
            pagination: MuiPagination,
          }}
        />
      )}
      {/* Confirmation modal */}
      <Modal open={confirmationModal}>
        <VariantConfirmationModal
          id={productSettings._id}
          variantId={confirmationModal}
          closeModal={handleDeleteVariant}
        />
      </Modal>
    </div>
  );
}

export { getServerSideProps };
