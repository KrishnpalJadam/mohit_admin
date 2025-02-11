// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ROLES_PRIVILEGES } from "@/graphql/RolesPrivileges.js";
import { addRole, editRole } from "@/redux/slices/roles.js";
import { FormTextField } from "@/helpers/FormFields.js";
import { isRequired } from "@/helpers/FormValidators.js";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// ** Third party imports
import { Field, Form } from "react-final-form";
import { useMutation } from "@apollo/client";
import { MdClose } from "react-icons/md";

export default function CreateRoleModal({ modal, initialRole }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // Initial value
  const initialValues = initialRole;

  // Store id
  const roleId = initialValues._id;

  // States
  const [checkedPrivileges, setCheckedPrivileges] = useState([]);

  //Queries
  useEffect(() => {
    if (initialValues._id) {
      setCheckedPrivileges(initialValues.privileges);
    }
  }, [initialValues]);

  const submit = (values) => {
    const valuesObject = {
      id: values._id ? values._id : null,
      name: values.name,
      privileges: checkedPrivileges,
    };

    if (checkedPrivileges.length === 0) {
      ToastStatus("Error", "Choose privileges");
    } else {
      rolesPrivileges({ variables: valuesObject });
    }
  };

  // Add / edit admin
  const [rolesPrivileges, { loading }] = useMutation(ROLES_PRIVILEGES, {
    onCompleted(data) {
      if (data.rolesPrivileges.status === 200) {
        roleId
          ? dispatch(editRole(data.rolesPrivileges))
          : dispatch(addRole(data.rolesPrivileges));

        ToastStatus("Success", data.rolesPrivileges.message);

        setTimeout(() => {
          closeModal();
        }, [1500]);
      } else {
        ToastStatus("Error", data.rolesPrivileges.message);
      }
    },
  });

  // Close modal
  const closeModal = () => {
    modal();
  };

  // Privileges
  const privileges = [
    {
      name: "Manage Dashboard",
      value: "/",
    },
    {
      name: "Manage Orders",
      value: "/orders",
    },
    {
      name: "Manage Products",
      value: "/products",
    },
    {
      name: "Manage Customers",
      value: "/customers",
    },
    {
      name: "Manage Homepage",
      value: "/homepage-settings",
    },
    {
      name: "Manage SiteSettings",
      value: "/site-settings",
    },
    {
      name: "Manage Shipping",
      value: "/shipping",
    },
    {
      name: "Manage Coupons",
      value: "/coupons",
    },
    {
      name: "Manage Static Pages",
      value: "/static-pages",
    },
    {
      name: "Change Password",
      value: "/change-password",
    },
  ];

  const handlePrivileges = (value) => () => {
    const currentIndex = checkedPrivileges.indexOf(value);
    const newChecked = [...checkedPrivileges];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedPrivileges(newChecked);
  };

  return (
    <Paper className={classes.rolesForm}>
      <Seo title={roleId ? "Update a role" : "Create a role"} />
      <div className={classes.closeIcon}>
        <MdClose onClick={closeModal} />
      </div>
      <Typography variant="h4">
        {roleId ? "Update a role" : "Create a role"}
      </Typography>
      <Form onSubmit={submit} initialValues={initialValues}>
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/* Role name */}
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="name"
                  component={FormTextField}
                  validate={isRequired}
                  label="Role Name"
                  disabled={roleId}
                />
              </div>
            </div>
            {/* Privileges */}
            <div className={classes.privileges}>
              <Typography variant="subtitle1" sx={{ mt: 5, mb: -3 }}>
                Privileges:
              </Typography>
              <div className={classes.formFields}>
                <div className={classes.formField}>
                  {privileges.slice(0, 8).map((privilege) => (
                    <div>
                      <FormControlLabel
                        key={privilege.value}
                        control={
                          <Checkbox
                            checked={
                              checkedPrivileges &&
                              checkedPrivileges.indexOf(privilege.value) !== -1
                            }
                            onChange={handlePrivileges(privilege.value)}
                            name={privilege.name}
                          />
                        }
                        label={privilege.name}
                      />
                    </div>
                  ))}
                </div>
                <div className={classes.formField}>
                  {privileges.slice(8, 15).map((privilege) => (
                    <div>
                      <FormControlLabel
                        key={privilege.value}
                        control={
                          <Checkbox
                            checked={
                              checkedPrivileges &&
                              checkedPrivileges.indexOf(privilege.value) !== -1
                            }
                            onChange={handlePrivileges(privilege.value)}
                            name={privilege.name}
                          />
                        }
                        label={privilege.name}
                      />
                    </div>
                  ))}
                </div>
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
