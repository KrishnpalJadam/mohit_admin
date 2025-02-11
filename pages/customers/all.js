// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { GET_CUSTOMERS } from "@/graphql/Customers.js";
import { getCustomers } from "@/redux/slices/customers.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import MuiPagination from "@/components/MuiPagination/MuiPagination";
import Seo from "@/components/Seo/Seo";
import useStyles from "@/components/CustomerManagement/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";

// ** Third Party Imports
import { useQuery } from "@apollo/client";
import { MdVisibility } from "react-icons/md";

export default function CustomerManagement() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [customers, setCustomers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("selectStatus");

  // Queries
  const customersQuery = useQuery(GET_CUSTOMERS);

  // Customers
  const customersData = useSelector((state) => state.customers.customers);

  useEffect(() => {
    const customers = customersQuery?.data?.getCustomers?.customers;

    if (customers && customersData.length === 0) {
      dispatch(getCustomers(customers));
    }

    setCustomers(customersData);
  }, [customersQuery, customersData]);

  // Table columns
  const columns = [
    {
      field: "_id",
      headerName: "Customer",
      width: 250,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={classes.customer}>
            {params.row.avatar?.includes("googleusercontent") ? (
              <Avatar alt={params.row.firstName} src={params.row.avatar} />
            ) : (
              <Avatar
                alt={params.row.firstName}
                src={
                  process.env.NEXT_PUBLIC_BACKEND_URL +
                  "profile/" +
                  params.row.avatar
                }
              />
            )}
            {params.row.firstName && (
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                @{params.row.firstName}
              </Typography>
            )}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "customerStatus ",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            {params.row.customerStatus === "active" && (
              <Typography
                variant="body1"
                className={`${classes.chip} ${classes.customerActive}`}
              >
                {CapitalizeText(params.row.customerStatus)}
              </Typography>
            )}
            {params.row.customerStatus === "suspended" && (
              <Typography
                variant="body1"
                className={`${classes.chip} ${classes.customerSuspended}`}
              >
                {CapitalizeText(params.row.customerStatus)}
              </Typography>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <Link href={"/customers/view/" + params.row._id}>
              <IconButton>
                <Tooltip title="View Customer" arrow>
                  <span>
                    <MdVisibility />
                  </span>
                </Tooltip>
              </IconButton>
            </Link>
          </>
        );
      },
    },
  ];

  // Filters
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);

    if (e.target.value !== "selectStatus") {
      const filteredCustomers = customersData.filter((customer) => {
        return customer.customerStatus === e.target.value;
      });

      setCustomers(filteredCustomers);
    } else {
      setCustomers(customersData);
    }
  };

  // Search
  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = customersData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field] && row[field].toString());
      });
    });

    setCustomers(filteredRows);
  };

  return (
    <div className={classes.tableContainer}>
      <Seo title={"Customer Management"} />
      <Typography variant="h4">Customers Management</Typography>
      <div className={classes.searchFilters}>
        <Typography variant="h6">Search Filters</Typography>
        <div className={classes.filters}>
          <Select
            value={statusFilter}
            onChange={handleStatusFilter}
            inputProps={{ "aria-label": "Without label" }}
            className={classes.filter}
          >
            <MenuItem value={"selectStatus"}>Select Status</MenuItem>
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"suspended"}>Suspended</MenuItem>
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
      {Array.isArray(customers) && (
        <DataGrid
          className={classes.table}
          rows={customers}
          columns={columns}
          getRowId={(row) => row._id}
          density="comfortable"
          headerHeight={55}
          rowHeight={55}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 7 },
            },
          }}
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No customers found
              </Stack>
            ),
            noResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No customers found
              </Stack>
            ),
            pagination: MuiPagination,
          }}
        />
      )}
    </div>
  );
}

export { getServerSideProps };
