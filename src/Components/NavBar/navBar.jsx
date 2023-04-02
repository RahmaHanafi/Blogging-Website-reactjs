import * as React from "react";
import Avatar from "@mui/material/Avatar";

import "./../../App.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function NavBar({ profileImg, userName }) {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-dark fixed-top shadow">
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
      </nav>

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
