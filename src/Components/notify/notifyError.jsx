import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function notifyError(content) {
  return toast.error(content, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
