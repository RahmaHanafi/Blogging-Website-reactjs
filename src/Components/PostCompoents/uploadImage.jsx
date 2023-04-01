import axios from "axios";
import notifyError from "../notify/notifyError";

export default async function uploadImg(file, setpostImg, handleLoading) {
  try {
    const formData = new FormData();
    formData.append("postImg", file, file.name);
    const { data } = await axios.post(
      "https://blogservice-tvsr.onrender.com/post/uploadPostImg",
      formData
    );
    console.log(data);
    setpostImg(data.postImg);
    handleLoading();
  } catch (e) {
    notifyError("You can upload Images only");
    console.log(e);
  }
}
