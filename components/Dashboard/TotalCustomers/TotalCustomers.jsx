// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { GET_COUNT } from "@/graphql/Count.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Third Party Imports
import { useQuery } from "@apollo/client";

export default function TotalCustomers() {
  const { classes } = useStyles();

  // States
  const [totalCustomer, setTotalCustomer] = useState(0);

  // Queries
  const { data } = useQuery(GET_COUNT, {
    variables: { model: "customers" },
  });

  useEffect(() => {
    const totalCustomers = data?.getCount?.count;

    if (totalCustomers) {
      setTotalCustomer(totalCustomers);
    }
  }, [data]);

  return (
    <Card className={classes.bg}>
      <CardContent>
        <Box
          sx={{
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              boxShadow: 3,
            }}
            className={classes.avatar}
            src={"/assets/customers.png"}
          />
        </Box>
        <Typography variant="h5">Total Customers</Typography>
        <Box sx={{ mt: 1, mb: 1, display: "flex", alignItems: "center" }}>
          <Typography variant="h2">{totalCustomer}</Typography>
        </Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Overall Customers
        </Typography>
      </CardContent>
    </Card>
  );
}
