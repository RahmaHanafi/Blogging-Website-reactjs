import * as React from "react";
import "./landingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

import axios from "axios";

export default function SignUp({ handleClickToggle }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const [moving, setmoving] = React.useState(false);
  const handlemoving = () => setmoving((show) => !show);

  const [loading, setLoading] = React.useState(false);
  const handleLoading = () => setLoading((show) => !show);

  const [isRegister, setRegister] = React.useState(true);
  const handleRegister = () => setRegister((show) => !show);

  const [isRegisterSuccess, setRegisterSuccess] = React.useState(false);
  const handleRegisterSuccess = () => setRegisterSuccess((show) => !show);

  const [AlertContent, setAlertContent] = React.useState("");

  const [userName, setuserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");

  const SignUp = async (e) => {
    e.preventDefault();
    const user = {
      userName,
      email,
      password,
      confirmPassword,
    };
    console.log(user);

    try {
      const { data } = await axios.post(
        "https://blogservice-tvsr.onrender.com/user/register",
        user
      );

      if (isRegister) {
        handleRegister();
      }

      handleRegisterSuccess();
      setAlertContent(data.message);
      console.log(data);

      setTimeout(() => {
        handlemoving();
        setTimeout(() => {
          handleClickToggle();
        }, 200);
      }, 2000);
    } catch (e) {
      if (isRegister) {
        handleRegister();
      }

      handleLoading();

      if (typeof e.response.data.message !== "object")
        setAlertContent(e.response.data.message);
      else setAlertContent(e.response.data.message[0]);

      console.log(e.response.data);
    }
  };

  return (
    <>
      <div
        className={
          "d-flex flex-column bg-white rounded p-5 paper m-5 my-auto " +
          (moving ? "mov" : "appearPage")
        }
      >
        <h3 className="mb-4 mt-4 fw-bold text-center">Create your Account!</h3>

        {isRegister ? (
          ""
        ) : (
          <Alert
            severity={isRegisterSuccess ? "success" : "error"}
            color={isRegisterSuccess ? "success" : "error"}
            className="mb-3 text-capitalize"
          >
            {AlertContent}
          </Alert>
        )}

        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          color="secondary"
          margin="normal"
          value={userName}
          onChange={(e) => {
            setuserName(() => e.target.value);
            console.log(userName);
          }}
        />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          color="secondary"
          value={email}
          onChange={(e) => {
            setEmail(() => e.target.value);
            console.log(email);
          }}
        />
        <FormControl variant="outlined" className="mt-2">
          <InputLabel htmlFor="outlined-adornment-password" color="secondary">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            color="secondary"
            value={password}
            onChange={(e) => {
              setPassword(() => e.target.value);
              console.log(password);
            }}
          />
        </FormControl>
        <FormControl variant="outlined" className="mt-2">
          <InputLabel htmlFor="outlined-adornment-password" color="secondary">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            color="secondary"
            value={confirmPassword}
            onChange={(e) => {
              setconfirmPassword(() => e.target.value);
              console.log(confirmPassword);
            }}
          />
        </FormControl>
        <Button
          color="secondary"
          variant="contained"
          className="mt-4 mb-2"
          size="large"
          onClick={(e) => {
            handleLoading();
            SignUp(e);
          }}
        >
          {loading ? <CircularProgress color="inherit" /> : "SIGN UP"}
        </Button>
        <div className="mx-auto">
          <span>Already Have Account? </span>
          <Button
            variant="text"
            onClick={() => {
              handlemoving();
              setTimeout(() => {
                handleClickToggle();
              }, 200);
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
