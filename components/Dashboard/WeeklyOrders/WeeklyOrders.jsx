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

export default function WeeklyOrders() {
  const { classes } = useStyles();

  // States
  const [currentWeekOrders, setCurrentWeekOrders] = useState(0);
  const [prevWeekOrders, setPrevWeekOrders] = useState(0);

  // Queries
  const { data } = useQuery(GET_PREV_MONTH_ORDERS);

  useEffect(() => {
    const prevMonthOrdersData = data?.getPrevMonthOrders;

    const lastWeeksOrders = []; // Last 2 weeks orders
    const currentWeekOrders = [];
    const prevWeekOrders = [];

    const createdAt = (ms) => {
      return new Date(ms);
    };

    const currentWeek = new Date().setDate(new Date().getDate() - 7); // Last 7 days
    const lastWeek = new Date().setDate(new Date().getDate() - 14); // Last 14 days

    if (prevMonthOrdersData) {
      prevMonthOrdersData.filter((order) => {
        return (
          createdAt(parseInt(order.createdAt)) > lastWeek &&
          lastWeeksOrders.push(order)
        );
      });
    }

    if (lastWeeksOrders.length > 0) {
      lastWeeksOrders.filter((order) => {
        return createdAt(parseInt(order.createdAt)) > currentWeek
          ? currentWeekOrders.push(order)
          : prevWeekOrders.push(order);
      });
    }

    if (currentWeekOrders.length > 0) {
      setCurrentWeekOrders(currentWeekOrders.length);
    }

    if (prevWeekOrders.length > 0) {
      setPrevWeekOrders(prevWeekOrders.length);
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
        title="Week Orders"
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
            {currentWeekOrders}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: theme.palette.success.main,
            }}
          >
            {percentageIncDec(prevWeekOrders, currentWeekOrders) > 0 ? (
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
            {percentageIncDec(prevWeekOrders, currentWeekOrders) > 0 ? (
              <Typography variant="h6" className={classes.increase}>
                {percentageIncDec(prevWeekOrders, currentWeekOrders) ===
                Infinity
                  ? 0
                  : percentageIncDec(prevWeekOrders, currentWeekOrders).toFixed(
                      0
                    )}
                %
              </Typography>
            ) : (
              <Typography variant="h6" className={classes.decrease}>
                {percentageIncDec(prevWeekOrders, currentWeekOrders).toFixed(0)}
                %
              </Typography>
            )}
          </Box>
        </Box>
        <Typography variant="subtitle2" sx={{ mb: 3 }}>
          vs last week
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
              className={classes.avatar}
              src={"/assets/totalOrders.png"}
            />
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Last Week Orders
            </Typography>
          </div>
          <div style={{ width: "30%" }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {prevWeekOrders} Orders
            </Typography>
            <LinearProgress
              value={Number(String((prevWeekOrders / 100) * 100).slice(0, 2))}
              variant="determinate"
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
