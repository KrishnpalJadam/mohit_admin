// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { GET_QUARTER_REVENUE } from "@/graphql/Orders.js";
import theme from "@/mui/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

// ** Third party imports
import { useQuery } from "@apollo/client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export default function MonthlyEarnings() {
  const { classes } = useStyles();

  // States
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState([]);
  const [lastMonthRevenue, setLastMonthRevenue] = useState([]);
  const [prevMonthRevenue, setPrevMonthRevenue] = useState([]);

  // Queries
  const { data } = useQuery(GET_QUARTER_REVENUE);

  useEffect(() => {
    const lastQuarterRevenue = data?.getLastQuarterRevenue;
    const currentMonthEarning = []; // Last 30 days
    const lastMonthEarning = []; // Last 60 days
    const prevMonthEarning = []; // Last 30 days

    const createdAt = (ms) => {
      return new Date(ms);
    };

    const currentMonth = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).getTime(); //To get last 30 days only

    const lastMonth = new Date(
      new Date().setMonth(new Date().getMonth() - 2)
    ).getTime(); //To get last 60 days only

    const prevMonth = new Date(
      new Date().setMonth(new Date().getMonth() - 3)
    ).getTime(); //To get last 60 days only

    if (lastQuarterRevenue) {
      lastQuarterRevenue.filter((order) => {
        return (
          createdAt(parseInt(order.createdAt)) > currentMonth &&
          currentMonthEarning.push(order.totalAmount)
        );
      });

      lastQuarterRevenue.filter((order) => {
        return (
          createdAt(parseInt(order.createdAt)) > lastMonth &&
          createdAt(parseInt(order.createdAt)) < currentMonth &&
          lastMonthEarning.push(order.totalAmount)
        );
      });

      lastQuarterRevenue.filter((order) => {
        return (
          createdAt(parseInt(order.createdAt)) > prevMonth &&
          createdAt(parseInt(order.createdAt)) < lastMonth &&
          prevMonthEarning.push(order.totalAmount)
        );
      });
    }

    if (currentMonthEarning.length > 0) {
      setCurrentMonthRevenue(currentMonthEarning);
    } else {
      setCurrentMonthRevenue([0]);
    }

    if (lastMonthEarning.length > 0) {
      setLastMonthRevenue(lastMonthEarning);
    } else {
      setLastMonthRevenue([0]);
    }

    if (prevMonthEarning.length > 0) {
      setPrevMonthRevenue(prevMonthEarning);
    } else {
      setPrevMonthRevenue([0]);
    }
  }, [data]);

  const totalMonthRevenue = (data) => {
    if (data.length > 0) {
      return data.reduce((a, b) => {
        return a + b;
      }, 0);
    }
  };

  const percentageIncDec = (a, b) => {
    var result = 0;
    result = ((b - a) * 100) / a;

    return result;
  };

  // To get current, last or previous months
  const getMonth = (value) => {
    const date = new Date();

    date.setMonth(date.getMonth() - value);
    const month = date.toLocaleString("default", { month: "long" });

    return month;
  };

  // Last 3 months data
  const chartData = [
    {
      name: getMonth(2),
      revenue: totalMonthRevenue(prevMonthRevenue)?.toFixed(2),
    },
    {
      name: getMonth(1),
      revenue: totalMonthRevenue(lastMonthRevenue)?.toFixed(2),
    },
    {
      name: getMonth(0),
      revenue: totalMonthRevenue(currentMonthRevenue)?.toFixed(2),
    },
  ];

  return (
    <Card className={classes.bg}>
      <CardHeader
        title="Month Earnings"
        titleTypographyProps={{
          sx: {
            lineHeight: "1.6 !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent>
        <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
          <Typography variant="h2">
            {totalMonthRevenue(currentMonthRevenue)?.toFixed(2)}
            {process.env.NEXT_PUBLIC_STORE_CURRENCY}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: theme.palette.success.main,
            }}
          >
            {percentageIncDec(
              totalMonthRevenue(lastMonthRevenue),
              totalMonthRevenue(currentMonthRevenue)
            ) > 0 ? (
              <AiFillCaretUp
                style={{
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
            {percentageIncDec(
              totalMonthRevenue(lastMonthRevenue),
              totalMonthRevenue(currentMonthRevenue)
            ) > 0 ? (
              <Typography variant="h6" className={classes.increase}>
                {percentageIncDec(
                  totalMonthRevenue(lastMonthRevenue),
                  totalMonthRevenue(currentMonthRevenue)
                ) === Infinity
                  ? 0
                  : percentageIncDec(
                      totalMonthRevenue(lastMonthRevenue),
                      totalMonthRevenue(currentMonthRevenue)
                    ).toFixed(0)}
                %
              </Typography>
            ) : (
              <Typography variant="h6" className={classes.decrease}>
                {percentageIncDec(
                  totalMonthRevenue(lastMonthRevenue),
                  totalMonthRevenue(currentMonthRevenue)
                ).toFixed(0)}
                %
              </Typography>
            )}
          </Box>
        </Box>
        <Typography variant="subtitle2" sx={{ mb: 8 }}>
          Compared to {totalMonthRevenue(lastMonthRevenue)} last month
        </Typography>
        <div className={classes.chart}>
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={theme.palette.primary.light}
                fill={theme.palette.primary.light}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
