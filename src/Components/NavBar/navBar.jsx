import * as React from "react";

import "./../../App.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = [];
const settings = ["Profile", "Logout"];
// "Products", "Pricing", "Blog"

export default function NavBar({ profileImg, userName }) {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

        // className={visible ? "appBar-Bg" : " "}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              // component="Link"
              // to="/home"
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

            {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                gap: 1,
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "cursive",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111260.png"
                className="logo-img "
              />
              Blogger
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box> */}

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
                  <Avatar alt={userName} src={profileImg} />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={
                        setting == "Logout"
                          ? () => {
                              localStorage.clear();
                              navigate("/", { replace: true });
                            }
                          : () => {
                              navigate("/profile", {
                                state: { profileImg, userName },
                              });
                            }
                      }
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <nav className="navbar navbar-dark fixed-top shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4494/4494539.png"
              className="logo-img "
            ></img>
            Blogger
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end nav-bg text-white"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header ">
              <Avatar alt={userName} src={profileImg} />
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                {userName}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Button
                    className="text-white"
                    startIcon={
                      <i className="fa-solid fa-arrow-right-from-bracket fa-flip-horizontal"></i>
                    }
                    onClick={() => {
                      localStorage.clear();
                      navigate("/", { replace: true });
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav> */}

      {/* <nav className="navbar bg-body-tertiary fixed-top shadow">
        <div className="container">
          <div className="logo gap-2 d-flex">
            <img src="../src/assets/bloglogo.png" className="logo-img"></img>
            <a className="navbar-brand text-white" href="#">
              Blogger
            </a>
          </div>

          <div className="ms-auto d-flex gap-2">
            <h6 className="text-white userName py-2">{userName}</h6>
            <Avatar alt={userName} src={profileImg} />
          </div>
        </div>
      </nav> */}
    </>
  );
}
