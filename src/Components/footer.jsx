import { useNavigate } from "react-router-dom";
import "./../App.css";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="footer nav-bg">
        <div className="container   py-4 ">
          <div className="row align-items-center ">
            <div className="col-lg-4 py-3 d-flex justify-content-center">
              Copyright &copy; Blogging Website 2023
            </div>
            <div className="col-lg-4 mx-auto my-lg-0 d-flex justify-content-center">
              <a
                className="btn btn-dark btn-social mx-2"
                href="https://twitter.com/rahmahanafi00"
                aria-label="Twitter"
                target="_blank"
                // onClick={() => {
                //   navigate("https://www.facebook.com/rahma.hanafy.92");
                // }}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="btn btn-dark btn-social mx-2"
                href="https://www.facebook.com/rahma.hanafy.92"
                aria-label="Facebook"
                target="_blank"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="btn btn-dark btn-social mx-2"
                href="https://www.linkedin.com/in/rahma-hanafi-6416a1210/"
                aria-label="LinkedIn"
                target="_blank"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="col-lg-4 text-lg-end  py-3 d-flex justify-content-center">
              <a className="link-dark text-decoration-none me-3" href="#!">
                Privacy Policy
              </a>
              <a className="link-dark text-decoration-none" href="#!">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
