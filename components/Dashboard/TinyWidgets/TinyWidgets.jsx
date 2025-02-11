// ** Next, React And Locals Imports
import useStyles from "./styles.js";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export default function TinyWidgets({ data }) {
  const { classes } = useStyles();

  return (
    <Card className={classes.bg}>
      <CardContent>
        <Box
          sx={{
            marginBottom: 4.5,
          }}
        >
          <Avatar
            sx={{
              boxShadow: 3,
            }}
            className={classes.avatar}
            src={data.icon}
          />
        </Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {data.title}
        </Typography>
        <Typography variant="h3">{data.total}</Typography>
      </CardContent>
    </Card>
  );
}
