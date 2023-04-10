import * as React from "react";
import "../../Components/landingComponents/landingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "../../Components/landingComponents/login";
import SignUp from "../../Components/landingComponents/signup";

export default function LandingPage() {
  const [toggle, setToggle] = React.useState(true);

  const handleClickToggle = () => setToggle((show) => !show);
  return (
    <>
      <div className="bg d-flex justify-content-center">
        <div className="landingEle my-auto">
          {toggle ? (
            <Login handleClickToggle={handleClickToggle} />
          ) : (
            <SignUp handleClickToggle={handleClickToggle} />
          )}
        </div>

        <div className="landingImg">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/blog-5addf.appspot.com/o/images%2Fphone.svg?alt=media&token=2dd2186f-ada5-454c-ae45-3bc2049e9c42"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
