// ** Third Party Imports
import toast from "react-hot-toast";

export default function ToastStatus(status, message, emoji) {
  switch (status) {
    case "Success":
      return toast.success(message, { position: "top-right" });
    case "Error":
      return toast.error(message, { position: "top-right" });
    case "Emoji":
      return toast(message, {
        icon: emoji,
        position: "top-right",
      });
    default:
      break;
  }
}
