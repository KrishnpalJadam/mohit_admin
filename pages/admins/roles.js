// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ROLES_PRIVILEGES } from "@/graphql/RolesPrivileges.js";
import { getRoles } from "@/redux/slices/roles.js";
import CreateRoleModal from "@/components/Admins/CreateRoleModal";
import RoleConfirmationModal from "@/components/Admins/RoleConfirmationModal";
import MuiPagination from "@/components/MuiPagination/MuiPagination";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import useStyes from "@/components/Admins/styles.js";
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

export default function Roles() {
  const dispatch = useDispatch();
  const { classes } = useStyes();

  // States
  const [roles, setRoles] = useState([]);
  const [modal, setModal] = useState(false);
  const [initialRole, setInitialRole] = useState({});
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Queries
  const rolesQuery = useQuery(GET_ROLES_PRIVILEGES);

  const rolesData = useSelector((state) => state.roles.roles);

  useEffect(() => {
    const roles = rolesQuery?.data?.getRolesPrivileges;

    if (roles && rolesData?.length === 0) {
      dispatch(getRoles(roles));
    }

    setRoles(rolesData);
  }, [rolesQuery, rolesData]);

  // Open a create or edit role modal
  const handleCreateRole = (value) => {
    setModal(!modal);
    setInitialRole(value);
  };

  // Table columns
  const columns = [
    {
      field: "role",
      headerName: "Role",
      width: 300,
      renderCell: (params) => {
        return <Typography variant="subtitle1">{params.row.name}</Typography>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <IconButton>
              <Tooltip title="Edit" arrow>
                <span>
                  <FiEdit2 onClick={() => handleCreateRole(params.row)} />
                </span>
              </Tooltip>
            </IconButton>
            <IconButton>
              <Tooltip title="Delete" arrow>
                <span>
                  <AiOutlineDelete
                    onClick={() => handleDeleteRole(params.row._id)}
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

    const filteredRows = rolesData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field] && row[field].toString());
      });
    });

    setRoles(filteredRows);
  };

  // Delete a role
  const handleDeleteRole = (id) => {
    if (id?.length === 24) {
      setConfirmationModal(id);
    } else {
      setConfirmationModal(null);
    }
  };

  return (
    <div className={classes.rolesTableContainer}>
      <Seo title={"Roles"} />
      <Toaster />
      <div className={classes.tableTop}>
        <Typography variant="h4">All Roles</Typography>
        <PrimaryButton
          type="submit"
          text="Add Role"
          onClick={() => handleCreateRole({})}
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
            label="Search Role..."
            type="search"
            variant="outlined"
            onChange={(e) => {
              requestSearch(e.target.value);
            }}
          />
        </Box>
      </div>
      {Array.isArray(roles) && (
        <DataGrid
          className={classes.table}
          rows={roles}
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
                No roles found
              </Stack>
            ),
            noResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No roles found
              </Stack>
            ),
            pagination: MuiPagination,
          }}
        />
      )}
      {/* Create role modal */}
      <Modal open={modal} onClose={handleCreateRole}>
        <CreateRoleModal modal={handleCreateRole} initialRole={initialRole} />
      </Modal>
      {/* Confirmation modal */}
      <Modal open={confirmationModal}>
        <RoleConfirmationModal
          id={confirmationModal}
          closeModal={handleDeleteRole}
        />
      </Modal>
    </div>
  );
}

export { getServerSideProps };
