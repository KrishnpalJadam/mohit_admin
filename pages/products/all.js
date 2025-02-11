// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCTS, SET_TRENDING_PRODUCTS } from "@/graphql/Products.js";
import { getProducts, setTrending } from "@/redux/slices/products.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import FormatLink from "@/helpers/FormatLink.js";
import MuiPagination from "@/components/MuiPagination/MuiPagination";
import CustomImage from "@/components/Image/CustomImage";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import ConfirmationModal from "@/components/Products/ConfirmationModal";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyes from "@/components/Products/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DataGrid } from "@mui/x-data-grid";

// ** Third Party Imports
import { useQuery, useMutation } from "@apollo/client";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Modal } from "@mui/material";

export default function Products() {
  const dispatch = useDispatch();
  const { classes } = useStyes();

  // States
  const [products, setProducts] = useState([]);
  const [stockStatus, setStockStatus] = useState("selectStatus");
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Queries
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
      limit: 0,
      page: 0,
    },
  });

  const productsData = useSelector((state) => state.products.products);

  useEffect(() => {
    const products = data?.getProducts.products;

    if (products && productsData?.length === 0) {
      dispatch(getProducts(products));
    }

    setProducts(productsData);
  }, [data, productsData]);

  // Table columns
  const columns = [
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className={classes.product}>
            <CustomImage
              src={
                process.env.NEXT_PUBLIC_BACKEND_URL +
                "product/" +
                params.row.images[0]
              }
              alt={params.row.name}
              width={80}
              height={80}
            />
            <Typography>{CapitalizeText(params.row.name)}</Typography>
          </div>
        );
      },
    },
    {
      field: "salePrice",
      headerName: "Price",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography>
            {params.row.salePrice}
            {process.env.NEXT_PUBLIC_STORE_CURRENCY}
          </Typography>
        );
      },
    },
    {
      field: "productType",
      headerName: "Type",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography>{CapitalizeText(params.row.productType)}</Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.stock > 0 ? (
              <Typography variant="body1" className={classes.inStock}>
                In Stock
              </Typography>
            ) : (
              <Typography variant="body1" className={classes.outOfStock}>
                Out Of Stock
              </Typography>
            )}
          </div>
        );
      },
    },
    {
      field: "trending",
      headerName: "Set As Trending",
      width: 200,
      renderCell: (params) => {
        return (
          <FormControl
            size="small"
            variant="filled"
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel>Trending</InputLabel>
            <Select
              value={params.row.trending ? params.row.trending : false}
              onChange={(e) => handleTrending(e, params.row._id)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Link href={"edit/" + params.row._id}>
              <IconButton>
                <Tooltip title="Edit" arrow>
                  <span>
                    <FiEdit2 />
                  </span>
                </Tooltip>
              </IconButton>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_CLIENT_URL}p/${FormatLink(
                params.row.name
              )}`}
              target="_blank"
            >
              <IconButton>
                <Tooltip title="View" arrow>
                  <span>
                    <HiOutlineExternalLink />
                  </span>
                </Tooltip>
              </IconButton>
            </Link>
            <IconButton>
              <Tooltip title="Delete" arrow>
                <span>
                  <AiOutlineDelete
                    onClick={() => handleDeleteProduct(params.row._id)}
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
  const handleStockFilter = (e) => {
    setStockStatus(e.target.value);

    if (e.target.value !== "selectStatus") {
      const filteredOrders = productsData.filter((product) => {
        if (e.target.value) {
          return product.stock > 0;
        } else {
          return product.stock === 0;
        }
      });

      setProducts(filteredOrders);
    } else {
      setProducts(productsData);
    }
  };

  // Search
  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = productsData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field] && row[field].toString());
      });
    });

    setProducts(filteredRows);
  };

  // Set / remove trending product
  const handleTrending = (e, id) => {
    const valuesObject = {
      id,
      trending: e.target.value,
    };

    setTrendingProduct({ variables: valuesObject });
  };

  const [setTrendingProduct] = useMutation(SET_TRENDING_PRODUCTS, {
    onCompleted(data) {
      if (data.setTrendingProduct.status === 200) {
        dispatch(setTrending(data.setTrendingProduct));
        ToastStatus("Success", data.setTrendingProduct.message);
      } else {
        ToastStatus("Error", "Error occurred");
      }
    },
  });

  // Delete a product
  const handleDeleteProduct = (id) => {
    if (id?.length === 24) {
      setConfirmationModal(id);
    } else {
      setConfirmationModal(null);
    }
  };

  return (
    <div className={classes.tableContainer}>
      <Seo title={"Products"} />
      <Toaster />
      <div className={classes.tableTop}>
        <Typography variant="h4">All Products</Typography>
        <PrimaryButton
          type="submit"
          text="Create Product"
          href={"/products/add/new"}
        />
      </div>
      <div className={classes.searchFilters}>
        <Typography variant="h5">Search Filters</Typography>
        <div className={classes.filters}>
          <Select
            value={stockStatus}
            onChange={handleStockFilter}
            inputProps={{ "aria-label": "Without label" }}
            className={classes.filter}
          >
            <MenuItem value={"selectStatus"}>Select Status</MenuItem>
            <MenuItem value={true}>In Stock</MenuItem>
            <MenuItem value={false}>Out Of Stock</MenuItem>
          </Select>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className={classes.filter}
          >
            <TextField
              label="Search field"
              type="search"
              variant="outlined"
              onChange={(e) => {
                requestSearch(e.target.value);
              }}
            />
          </Box>
        </div>
      </div>
      {Array.isArray(products) && (
        <DataGrid
          className={classes.table}
          rows={products}
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
                No products found
              </Stack>
            ),
            noResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No products found
              </Stack>
            ),
            pagination: MuiPagination,
          }}
        />
      )}
      {/* Confirmation modal */}
      <Modal open={confirmationModal}>
        <ConfirmationModal
          id={confirmationModal}
          closeModal={handleDeleteProduct}
        />
      </Modal>
    </div>
  );
}

export { getServerSideProps };
