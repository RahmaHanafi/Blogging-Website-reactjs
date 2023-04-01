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
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ handleClickToggle }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [moving1, setmoving] = React.useState(false);
  const handlemoving = () => setmoving((show) => !show);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const handleLoading = () => setLoading((show) => !show);

  const [isLogin, setLogin] = React.useState(false);
  const handleLogin = () => setLogin((show) => !show);

  const [AlertContent, setAlertContent] = React.useState([]);

  const Login = async (e) => {
    console.log({
      email,
      password,
    });
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://blogservice-tvsr.onrender.com/user/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);

      navigate("/home", { replace: true });
      console.log(data);
    } catch (e) {
      if (!isLogin) {
        handleLogin();
      }
      handleLoading();

      if (typeof e.response.data.message !== "object")
        setAlertContent(e.response.data.message);
      else setAlertContent(e.response.data.message[0]);
      console.log(e.response.data.message);
    }
  };

  return (
    <div
      className={
        "d-flex flex-column bg-white rounded p-5 paper  m-5 my-auto " +
        (moving1 ? "mov" : "appearPage")
      }
    >
      <h3 className="mb-4 mt-4 fw-bold text-center">Account Login</h3>
      {isLogin ? (
        <Alert severity="error" color="error" className="mb-3 text-capitalize">
          {AlertContent}
        </Alert>
      ) : (
        ""
      )}
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        color="secondary"
        value={email}
        onChange={(e) => {
          setEmail(() => e.target.value);
          console.log(email);
        }}
      />
      <FormControl variant="outlined" className="mt-3">
        <InputLabel htmlFor="outlined-adornment-password" color="secondary">
          Password
        </InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
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
      <Button
        color="secondary"
        variant="contained"
        className="mt-4 mb-2"
        size="large"
        onClick={(e) => {
          handleLoading();
          Login(e);
        }}
      >
        {loading ? <CircularProgress color="inherit" /> : "LOGIN"}
      </Button>
      <div className="mx-auto">
        <span>Don't Have Account? </span>
        <Button
          variant="text"
          onClick={() => {
            handlemoving();
            setTimeout(() => {
              handleClickToggle();
            }, 200);
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
