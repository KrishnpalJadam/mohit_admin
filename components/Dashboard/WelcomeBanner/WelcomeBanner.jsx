// ** Next, React And Locals Imports
import Greetings from "@/helpers/Greetings.js";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles.js";

// ** MUI Imports
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export default function WelcomeBanner() {
  const { classes } = useStyles();

  return (
    <Card className={classes.bg}>
      <CardContent className={classes.content}>
        <Typography variant="h2">{Greetings()}</Typography>
        <CustomImage
          src={"/assets/greetingAvatar.webp"}
          alt="greeting avatar"
          fill={true}
        />
      </CardContent>
    </Card>
  );
}
