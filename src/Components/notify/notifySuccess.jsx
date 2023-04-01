import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function notifySuccess(content) {
  return toast.success(content, {
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
