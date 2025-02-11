// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import { GET_PREV_MONTH_ORDERS } from "@/graphql/Orders.js";
import theme from "@/mui/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";

// ** Third party imports
import { useQuery } from "@apollo/client";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export default function MonthlyOrders() {
  const { classes } = useStyles();

  // States
  const [currentMonthOrders, setCurrentMonthOrders] = useState(0);
  const [prevMonthOrders, setPrevMonthOrders] = useState(0);

  // Queries
  const { data } = useQuery(GET_PREV_MONTH_ORDERS);

  useEffect(() => {
    const prevMonthOrdersData = data?.getPrevMonthOrders;
    const currentMonthOrders = [];
    const prevMonthOrders = [];

    const createdAt = (ms) => {
      return new Date(ms);
    };

    const date = new Date();

    const previousMonth = new Date(
      date.setMonth(date.getMonth() - 1)
    ).getTime(); //To get last 30 days only

    if (prevMonthOrdersData) {
      prevMonthOrdersData.filter((order) => {
        return createdAt(parseInt(order.createdAt)) > previousMonth
          ? currentMonthOrders.push(order)
          : prevMonthOrders.push(order);
      });
    }

    if (currentMonthOrders.length > 0) {
      setCurrentMonthOrders(currentMonthOrders.length);
    }

    if (prevMonthOrders.length > 0) {
      setPrevMonthOrders(prevMonthOrders.length);
    }
  }, [data]);

  const percentageIncDec = (a, b) => {
    var result = 0;
    result = ((b - a) * 100) / a;

    return result;
  };

  return (
    <Card className={classes.bg}>
      <CardHeader
        title="Month Orders"
        titleTypographyProps={{
          sx: {
            lineHeight: "1.6 !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent>
        <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
          <Typography variant="h2" sx={{ pr: 1 }}>
            {currentMonthOrders}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: theme.palette.success.main,
            }}
          >
            {percentageIncDec(prevMonthOrders, currentMonthOrders) > 0 ? (
              <AiFillCaretUp
                sx={{
                  fontSize: "1.5em",
                  verticalAlign: "middle",
                  color: theme.palette.success.main,
                }}
              />
            ) : (
              <AiFillCaretDown
                sx={{
                  fontSize: "1.5em",
                  verticalAlign: "middle",
                  color: theme.palette.error.main,
                }}
              />
            )}
            {percentageIncDec(prevMonthOrders, currentMonthOrders) > 0 ? (
              <Typography variant="h6" className={classes.increase}>
                {percentageIncDec(prevMonthOrders, currentMonthOrders) ===
                Infinity
                  ? 0
                  : percentageIncDec(
                      prevMonthOrders,
                      currentMonthOrders
                    ).toFixed(0)}
                %
              </Typography>
            ) : (
              <Typography variant="h6" className={classes.decrease}>
                {percentageIncDec(prevMonthOrders, currentMonthOrders).toFixed(
                  0
                )}
                %
              </Typography>
            )}
          </Box>
        </Box>
        <Typography variant="subtitle2" sx={{ mb: 3 }}>
          vs last month
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <Avatar
              variant="rounded"
              sx={{
                boxShadow: 1,
              }}
              className={classes.avatar}
              src={"/assets/totalOrders.png"}
            />
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Last Month Orders
            </Typography>
          </div>
          <div style={{ width: "30%" }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {prevMonthOrders} Orders
            </Typography>
            <LinearProgress
              value={Number(String((prevMonthOrders / 100) * 100).slice(0, 2))}
              variant="determinate"
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
