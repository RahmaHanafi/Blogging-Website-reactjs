import * as React from "react";
import "./../../App.css";
import "./posts.css";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import notifyError from "../notify/notifyError";
import notifySuccess from "../notify/notifySuccess";

export default function DeletePost({
  postId,
  open,
  handleClose,
  handlegetAllPosts,
}) {
  const DeletePost = async (e) => {
    let token = localStorage.getItem("token");

    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `https://blogservice-tvsr.onrender.com/post/${postId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data);

      handlegetAllPosts();
      notifySuccess("Post deleted");
    } catch (e) {
      notifyError("Post deletion failed");
      console.log(e);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        className="dialogClass"
      >
        <DialogTitle className="fw-bold">Delete post</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={(e) => {
              DeletePost(e);
              console.log(postId);
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
