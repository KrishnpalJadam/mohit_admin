// ** Next, React And Locals Imports
import { useRouter } from "next/router";
import { ADMIN_LOGIN } from "@/graphql/Admins.js";
import { FormTextField } from "@/helpers/FormFields.js";
import {
  composeValidators,
  isValidEmail,
  isRequired,
} from "@/helpers/FormValidators.js";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/styles/login.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { useMutation } from "@apollo/client";

export default function LoginPage() {
  const { classes } = useStyles();
  const router = useRouter();

  const submit = (values) => {
    const valuesObject = {
      email: values.email.toLowerCase(),
      password: values.password,
    };

    adminLogin({ variables: valuesObject });
  };

  // To redirect admins to proper routes
  const privilegeRouteMap = {
    orders: "/orders/all",
    products: "/products/all",
    customers: "/customers/all",
    "homepage-settings": "/homepage-settings/page-1",
    "site-settings": "/site-settings/page-1",
    shipping: "/shipping",
    coupons: "/coupons",
    "static-pages": "/static-pages",
    "change-password": "/change-password",
  };

  const [adminLogin, { loading }] = useMutation(ADMIN_LOGIN, {
    onCompleted(data) {
      console.log("-----data",data)
      if (data.adminLogin.status === 200 || data.adminLogin.status === 201) {
        if (data.adminLogin.role.name !== "superAdmin") {
          const privileges = data.adminLogin.role.privileges;

          // Check if "/" is included in privileges
          const isDashboardExist = privileges.includes("/");

          if (!isDashboardExist) {
            const firstPrivilege = privileges[0]?.split("/")[1];

            const mappedRoute = privilegeRouteMap[firstPrivilege];

            router.push(mappedRoute);
          } else {
            router.push("/");
          }
        } else {
          router.push("/");
        }
      } else {
        ToastStatus("Error", data.adminLogin.message);
      }
    },
  });

  return (
    <div className={classes.container}>
      <Seo title={"Login"} />
      <Toaster />
      <Paper className={classes.loginForm}>
        <Typography variant="h3">Login</Typography>
        <Form onSubmit={submit}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.formField}>
                <Field
                  name="email"
                  component={FormTextField}
                  validate={composeValidators(isValidEmail, isRequired)}
                  label="Email"
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="password"
                  type="password"
                  component={FormTextField}
                  validate={isRequired}
                  label="Password"
                />
              </div>
              <div className={classes.actionBtn}>
                <PrimaryButton
                  type="submit"
                  text="Login"
                  disabled={invalid}
                  spinner={loading}
                  fullWidth
                />
              </div>
            </form>
          )}
        </Form>
      </Paper>
    </div>
  );
}
