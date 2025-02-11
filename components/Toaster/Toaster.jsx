// ** Next, React And Locals Imports
import theme from "@/mui/theme.js";

// ** Third Party Imports
import { Toaster as CustomToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <CustomToaster
      toastOptions={{
        style: {
          border: `2px solid ${theme.palette.primary.light}`,
          borderRadius: "5px",
          padding: "10px",
          color: theme.palette.common.black,
        },
      }}
    />
  );
}
