// ** MUI Imports
import Typography from "@mui/material/Typography";

const Greetings = () => {
  var today = new Date();
  var currentHour = today.getHours();

  if (currentHour < 12) {
    return <Typography variant="h4">Good Morning 🌤️</Typography>;
  } else if (currentHour < 18) {
    return <Typography variant="h4">Good Afternoon 🌞</Typography>;
  } else {
    return <Typography variant="h4">Good Evening ✨</Typography>;
  }
};

export default Greetings;
