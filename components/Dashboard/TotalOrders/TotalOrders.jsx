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

// ** MUI imports
import { useQuery } from "@apollo/client";

export default function TotalOrders() {
  const { classes } = useStyles();

  // States
  const [totalOrders, setTotalOrders] = useState(0);

  // Queries
  const { data } = useQuery(GET_COUNT, {
    variables: { model: "orders" },
  });

  // Total orders count
  useEffect(() => {
    const totalOrders = data?.getCount?.count;

    if (totalOrders) {
      setTotalOrders(totalOrders);
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
            src={"/assets/totalOrders.png"}
          />
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Total Orders
          </Typography>
          <Typography variant="h2">{totalOrders}</Typography>
        </Box>
        <Typography variant="subtitle2">Overall orders</Typography>
      </CardContent>
    </Card>
  );
}
