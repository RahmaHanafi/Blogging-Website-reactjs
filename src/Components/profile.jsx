import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar/navBar";
import "./../App.css";
import { Typography } from "@mui/material";

export default function Profile(props) {
  const { state } = useLocation();

  console.log(state);
  //   const { profileImg, userName } = route.params;
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="bg-light mt-5">
        <div className="container">
          <div className="d-flex gap-2">
            <img
              src="{location.state.profileImg}"
              alt="{location.state.userName}"
              className="rounded-circle profileImage"
            />
            <Typography
              variant="h5"
              component="h5"
              sx={{ fontFamily: "cursive", fontWeight: 700 }}
              className="my-auto"
            >
              "hh"
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
