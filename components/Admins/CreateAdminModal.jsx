// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADMINS } from "@/graphql/Admins.js";
import { GET_ROLES_PRIVILEGES } from "@/graphql/RolesPrivileges.js";
import { addAdmin, editAdmin } from "@/redux/slices/admins.js";
import { getRoles } from "@/redux/slices/roles.js";
import { FormTextField } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isRequired,
  isValidEmail,
  isValidPassword,
} from "@/helpers/FormValidators.js";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// ** Third party imports
import { Field, Form } from "react-final-form";
import { useQuery, useMutation } from "@apollo/client";
import { MdClose } from "react-icons/md";

export default function CreateAdminModal({ modal, initialAdmin }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // Initial value
  const initialValues = initialAdmin;

  // Admin id
  const adminId = initialValues._id;

  // Generate random password
  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    let password = "";

    for (let i = 0; i < 10; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
  };

  // Pushing generatedPassword to initialValues when creating admin only
  if (!adminId) {
    initialValues.password = generatePassword();
  }

  // States
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  //Queries
  const rolesQuery = useQuery(GET_ROLES_PRIVILEGES);

  const rolesData = useSelector((state) => state.roles.roles);

  useEffect(() => {
    const roles = rolesQuery?.data?.getRolesPrivileges;

    if (roles) {
      dispatch(getRoles(roles));
    }

    setRoles(rolesData);
  }, [rolesQuery, rolesData]);

  // Setting initial role
  useEffect(() => {
    if (initialValues._id) {
      setSelectedRole({
        _id: initialValues.role._id,
        name: initialValues.role.name,
        privileges: initialValues.role.privileges,
      });
    }
  }, [initialValues, adminId]);

  const submit = (values) => {
    const valuesObject = {
      id: values._id ? values._id : null,
      name: values.name,
      email: values.email,
      password: adminId ? " " : values.password,
      role: selectedRole?._id,
    };

    if (selectedRole === null) {
      ToastStatus("Error", "Select role");
    } else {
      admins({ variables: valuesObject });
    }
  };

  // Add / edit admin
  const [admins, { loading }] = useMutation(ADMINS, {
    onCompleted(data) {
      if (data.admins.status === 200) {
        adminId
          ? dispatch(editAdmin(data.admins))
          : dispatch(addAdmin(data.admins));

        ToastStatus("Success", data.admins.message);

        setTimeout(() => {
          closeModal();
        }, [1500]);
      } else {
        ToastStatus("Error", data.admins.message);
      }
    },
  });

  // Close modal
  const closeModal = () => {
    modal();
  };

  return (
    <Paper className={classes.adminsForm}>
      <Seo title={adminId ? "Update a admin" : "Create a admin"} />
      <div className={classes.closeIcon}>
        <MdClose onClick={closeModal} />
      </div>
      <Typography variant="h4">
        {adminId ? "Update a admin" : "Create a admin"}
      </Typography>
      <Form onSubmit={submit} initialValues={initialValues}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/* Name */}
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field name="name" component={FormTextField} label="Name" />
              </div>
            </div>
            {/* Email & Password */}
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="email"
                  component={FormTextField}
                  validate={composeValidators(isRequired, isValidEmail)}
                  label="Email"
                  disabled={adminId && true}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="password"
                  component={FormTextField}
                  validate={
                    !adminId && composeValidators(isRequired, isValidPassword)
                  }
                  label="Password"
                  disabled={adminId && true}
                />
              </div>
            </div>
            {/* Role */}
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Autocomplete
                  options={roles}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    setSelectedRole(newValue);
                  }}
                  value={selectedRole}
                  noOptionsText="Choose role"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Role"
                      placeholder="Select role"
                    />
                  )}
                />
              </div>
            </div>
            <div className={classes.actionBtn}>
              <PrimaryButton
                type="submit"
                text="Save"
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
