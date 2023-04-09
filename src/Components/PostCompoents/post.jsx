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
  localDate = localDate.replace("at ", " ");

  return (
    <>
      <div className="post bg-white  mt-3 rounded-4 pb-3">
        {/* <div className="post-user d-flex gap-1 p-3">
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
        </div> */}

        <img className="post-img w-100 rounded-top-4" src={postImg} />

        <p className="px-4  text-capitalize title py-0 pt-4">{Title}</p>
        <div className="px-4 pb-1 mt-0 content">
          {content.length > 160 ? <ReadMore>{content}</ReadMore> : content}
        </div>

        <div className="post-user d-flex gap-1 px-4">
          <Avatar alt={userName} src={profileImg} />
          <div className="gap-0 ps-1">
            <h6 className="username">{userName}</h6>
            <p className="text-secondary date">{localDate}</p>
          </div>
          {postOwnerId === UserId ? (
            <div className="ms-auto d-flex gap-1">
              <IconButton
                variant="outlined"
                onClick={() => {
                  setIsUpdateOrDel("update");
                  handleClickOpen();
                }}
                className="button"
              >
                <i className="fa-solid fa-marker edit"></i>
              </IconButton>

              <IconButton
                variant="outlined"
                onClick={() => {
                  setIsUpdateOrDel("delete");
                  handleClickOpen();
                }}
                className="button"
              >
                <i className="fa-regular fa-trash-can remove"></i>
              </IconButton>
            </div>
          ) : (
            ""
          )}
        </div>
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
