import * as React from "react";
import axios from "axios";
import "./../../App.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import notifySuccess from "../notify/notifySuccess";
import notifyError from "../notify/notifyError";
import { CircularProgress, IconButton } from "@mui/material";
import uploadImg from "./uploadImage";

export default function UpdatePost({
  profileImg,
  userName,
  postId,
  PTitle,
  PpostImg,
  Pcontent,
  open,
  setOpen,
  handlegetAllPosts,
}) {
  const [loading, setLoading] = React.useState(false);
  const handleLoading = () => setLoading((show) => !show);

  const handleClose = () => {
    setOpen(false);
    setTitle(PTitle);
    setContent(Pcontent);
    setpostImg(PpostImg);
  };

  const [Title, setTitle] = React.useState(PTitle);
  const [content, setContent] = React.useState(Pcontent);
  const [postImg, setpostImg] = React.useState(PpostImg);

  const EditPost = async (e) => {
    let token = localStorage.getItem("token");

    e.preventDefault();
    const post = {
      Title,
      content,
      postImg,
    };
    console.log(post);
    try {
      const { data } = await axios.patch(
        `https://blogservice-tvsr.onrender.com/post/${postId}`,
        post,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data);

      handlegetAllPosts();
      notifySuccess("Updated post successfully");
    } catch (e) {
      notifyError("Post update failed");
      console.log(e.response.data);
    }
  };

  return (
    <>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>{"Update post"}</DialogTitle>
        <Box
          sx={{
            minWidth: 310,
            maxWidth: 530,
          }}
        >
          <div className="px-4 pb-3 d-flex gap-2">
            <Avatar alt={userName} src={profileImg}></Avatar>
            <h6 className="fw-bold pt-2">{userName}</h6>
          </div>

          <div className="px-4 pb-3 d-flex flex-column ">
            <TextField
              id="Title"
              label="Title"
              variant="filled"
              color="secondary"
              value={Title}
              onChange={(e) => {
                setTitle(() => e.target.value);
                console.log(Title);
              }}
            />
            <TextField
              id="Content"
              label="Content"
              variant="filled"
              color="secondary"
              value={content}
              onChange={(e) => {
                setContent(() => e.target.value);
                console.log(content);
              }}
              multiline
              rows={4}
              className="mt-3"
            />
          </div>
          {postImg ? (
            <div>
              <IconButton
                className="DeleteImgIcon ms-5"
                variant="outlined"
                onClick={() => {
                  setpostImg("");
                }}
              >
                {" "}
                <i className="fa-solid fa-xmark"></i>
              </IconButton>
              <img
                src={postImg}
                className="rounded-3 w-75 d-flex mx-auto postImgClass"
              />
            </div>
          ) : loading ? (
            <CircularProgress color="secondary" className="d-flex mx-auto" />
          ) : (
            ""
          )}
        </Box>

        <DialogActions className="me-3 mb-3 gap-2">
          <Button
            variant="outlined"
            color="secondary"
            className=" text-capitalize "
            startIcon={<i className="fa-regular fa-image"></i>}
            component="label"
          >
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                uploadImg(file, setpostImg, handleLoading);
                console.log(file);
                handleLoading();
              }}
            />
          </Button>

          {postImg || content ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                EditPost(e);
                handleClose();
              }}
            >
              Update
            </Button>
          ) : (
            <Button disabled>Update</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
