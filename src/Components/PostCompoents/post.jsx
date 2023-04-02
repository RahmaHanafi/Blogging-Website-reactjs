import * as React from "react";
import "./../../App.css";
import "./posts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeletePost from "./deletePost";
import UpdatePost from "./updatePost";
import ReadMore from "../readmore";

export default function Post({
  postId,
  userName,
  profileImg,
  Title,
  postImg,
  content,
  createdDate,
  postOwnerId,
  UserId,
  handlegetAllPosts,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [IsUpdateOrDel, setIsUpdateOrDel] = React.useState("");

  let localDate = new Date(createdDate).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "full",
  });

  localDate = localDate.replace("Eastern European Standard Time", " ");

  return (
    <>
      <div className="bg-white border border-secondary-subtle rounded-4 mt-3">
        <div className="post-user d-flex gap-1 p-3">
          <Avatar alt={userName} src={profileImg} />
          <div className="gap-0 ps-1">
            <h6 className="fw-bold">{userName}</h6>
            <h6 className="text-secondary date">{localDate}</h6>
          </div>
          {postOwnerId === UserId ? (
            <div className="ms-auto d-flex">
              <IconButton
                variant="outlined"
                onClick={() => {
                  setIsUpdateOrDel("update");
                  handleClickOpen();
                }}
              >
                <i className="fa-solid fa-marker edit"></i>
              </IconButton>

              <IconButton
                variant="outlined"
                onClick={() => {
                  setIsUpdateOrDel("delete");
                  handleClickOpen();
                }}
              >
                <i className="fa-regular fa-trash-can remove"></i>
              </IconButton>
            </div>
          ) : (
            ""
          )}
        </div>
        <h6 className="px-3 fw-bold title">{Title}</h6>
        <div className="px-3">
          {content.length > 160 ? <ReadMore>{content}</ReadMore> : content}
        </div>
        <img className="post-img w-100 pb-5 pt-1" src={postImg} />
      </div>

      {IsUpdateOrDel === "update" ? (
        <UpdatePost
          profileImg={profileImg}
          userName={userName}
          postId={postId}
          PTitle={Title}
          PpostImg={postImg}
          Pcontent={content}
          open={open}
          setOpen={setOpen}
          handlegetAllPosts={handlegetAllPosts}
        ></UpdatePost>
      ) : (
        <DeletePost
          postId={postId}
          open={open}
          handleClose={handleClose}
          handlegetAllPosts={handlegetAllPosts}
        ></DeletePost>
      )}
      <ToastContainer />
    </>
  );
}
