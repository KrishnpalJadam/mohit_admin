// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ADMINS } from "@/graphql/Admins.js";
import { getAdmins } from "@/redux/slices/admins.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import CreateAdminModal from "@/components/Admins/CreateAdminModal";
import AdminConfirmationModal from "@/components/Admins/AdminConfirmationModal";
import MuiPagination from "@/components/MuiPagination/MuiPagination";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import theme from "@/mui/theme.js";
import useStyles from "@/components/Admins/styles.js";
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

export default function Admins() {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  // States
  const [initialAdmin, setInitialAdmin] = useState({});
  const [modal, setModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Queries
  const adminsQuery = useQuery(GET_ADMINS);

  const adminsData = useSelector((state) => state.admins.admins);

  useEffect(() => {
    const admins = adminsQuery?.data?.getAdmins;

    if (admins && adminsData?.length === 0) {
      dispatch(getAdmins(admins));
    }

    setAdmins(adminsData);
  }, [adminsQuery, adminsData]);

  // Open a create or edit store modal
  const handleCreateAdmin = (value) => {
    setModal(!modal);

    setInitialAdmin(value);
  };

  // Table columns
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return <Typography variant="subtitle1">{params.row.name}</Typography>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return <Typography variant="subtitle1">{params.row.email}</Typography>;
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            sx={{
              p: "6px 8px",
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.common.white,
              borderRadius: "50px",
            }}
          >
            {CapitalizeText(params.row.role.name)}
          </Typography>
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
            <IconButton>
              <Tooltip title="Edit" arrow>
                <span>
                  <FiEdit2 onClick={() => handleCreateAdmin(params.row)} />
                </span>
              </Tooltip>
            </IconButton>
            <IconButton>
              <Tooltip title="Delete" arrow>
                <span>
                  <AiOutlineDelete
                    onClick={() => handleDeleteAdmin(params.row._id)}
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

    const filteredRows = adminsData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field] && row[field].toString());
      });
    });

    setAdmins(filteredRows);
  };

  // Delete admin
  const handleDeleteAdmin = (id) => {
    if (id?.length === 24) {
      setConfirmationModal(id);
    } else {
      setConfirmationModal(null);
    }
  };

  return (
    <div className={classes.adminsTableContainer}>
      <Seo title={"Admins"} />
      <Toaster />
      <div className={classes.tableTop}>
        <Typography variant="h4">All Admins</Typography>
        <PrimaryButton
          type="submit"
          text="Add Admin"
          onClick={() => handleCreateAdmin({})}
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
            label="Search Admin..."
            type="search"
            variant="outlined"
            onChange={(e) => {
              requestSearch(e.target.value);
            }}
          />
        </Box>
      </div>
      {Array.isArray(admins) && (
        <DataGrid
          className={classes.table}
          rows={admins}
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
                No admins found
              </Stack>
            ),
            noResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No admins found
              </Stack>
            ),
            pagination: MuiPagination,
          }}
        />
      )}
      {/* Create admin modal */}
      <Modal open={modal} onClose={handleCreateAdmin}>
        <CreateAdminModal
          modal={handleCreateAdmin}
          initialAdmin={initialAdmin}
        />
      </Modal>
      {/* Confirmation modal */}
      <Modal open={confirmationModal}>
        <AdminConfirmationModal
          id={confirmationModal}
          closeModal={handleDeleteAdmin}
        />
      </Modal>
    </div>
  );
}

export { getServerSideProps };
