// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { TOTAL_REVENUE } from "@/graphql/Orders.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Third Party imports
import { useQuery } from "@apollo/client";

export default function TotalRevenue() {
  const { classes } = useStyles();

  // States
  const [revenue, setRevenue] = useState(null);

  // Queries
  const { data } = useQuery(TOTAL_REVENUE);

  // Calculate total revenue
  useEffect(() => {
    const totalRevenue = data?.getRevenue?.length;

    if (totalRevenue) {
      const totalAmount = [];

      data.getRevenue.map((order) => totalAmount.push(order.totalAmount));

      const totalRevenue = totalAmount.reduce((a, b) => {
        return a + b;
      }, 0);

      setRevenue(totalRevenue);
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
            src={"/assets/totalRevenue.png"}
          />
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Total Revenue
          </Typography>
          <Typography variant="h2">
            {revenue?.toFixed(2)}
            {process.env.NEXT_PUBLIC_STORE_CURRENCY}
          </Typography>
        </Box>
        <Typography variant="subtitle2">Overall revenue</Typography>
      </CardContent>
    </Card>
  );
}
