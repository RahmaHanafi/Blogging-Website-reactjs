import * as React from "react";

import "./../../App.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import notifySuccess from "../notify/notifySuccess";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import uploadImg from "../PostCompoents/uploadImage";
import { ToastContainer } from "react-toastify";
import notifyError from "../notify/notifyError";
import axios from "axios";

export default function NavBar({ profileImage, userName, handlegetUserData }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = React.useState(false);
  const handleLoading = () => setLoading((show) => !show);

  const [profileImg, setprofileImg] = React.useState(profileImage);

  const NewProfileImg = async (e) => {
    let token = localStorage.getItem("token");

    e.preventDefault();
    const userImg = {
      profileImg,
    };
    console.log(userImg);
    try {
      const { data } = await axios.patch(
        "https://blogservice-tvsr.onrender.com/user/uploadProfileImage",
        userImg,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data);

      handlegetUserData();
      notifySuccess("Update profile picture successfully");
    } catch (e) {
      notifyError("failed");
      console.log(e);
    }
  };

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [visible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 250) {
      setVisible(true);
    } else if (scrolled <= 250) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        style={{
          background: visible ? "#8C6AB1" : "transparent",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                gap: 1,
                mr: 2,
                display: { xs: "flex", md: "flex" },
                fontFamily: "cursive",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
              onClick={() => {
                navigate("/home");
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111260.png"
                className="logo-img "
              />
              Blogger
            </Typography>

            <Box sx={{ flexGrow: 0 }} className="d-flex  ms-auto">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  gap: 1,
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "cursive",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Hi, {userName}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userName} src={profileImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={(e) => {
                    handleCloseUserMenu();
                    handleClickOpen();
                    console.log(e);
                  }}
                >
                  Update profile picture
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    handleCloseUserMenu();
                    localStorage.clear();
                    console.log(e);
                    navigate("/", { replace: true });
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>{"Update Profile Picture"}</DialogTitle>

        <Box
          sx={{
            minWidth: 310,
            maxWidth: 530,
          }}
        >
          <div className="px-4 pb-3 d-flex flex-column "></div>
          {profileImg ? (
            <div>
              <IconButton
                className="DeleteImgIcon ms-5"
                variant="outlined"
                onClick={() => {
                  setprofileImg("");
                }}
              >
                {" "}
                <i className="fa-solid fa-xmark"></i>
              </IconButton>
              <img
                src={profileImg}
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
                uploadImg(file, setprofileImg, handleLoading);
                console.log(file);
                handleLoading();
              }}
            />
          </Button>

          {profileImg ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                NewProfileImg(e);
                handleClose();
              }}
            >
              OK
            </Button>
          ) : (
            <Button disabled>OK</Button>
          )}
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
}
