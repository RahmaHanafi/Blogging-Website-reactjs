import * as React from "react";
import Fab from "@mui/material/Fab";
import "./../App.css";

export default function ScrollButton() {
  const [visible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <div className="d-flex flex-row-reverse ">
        <Fab
          color="secondary"
          aria-label="up"
          onClick={scrollToTop}
          size="small"
          sx={{
            position: visible ? "fixed" : "none",
            bottom: 0,
            right: 0,
            marginBottom: 5,
            marginRight: 5,
          }}
        >
          <i className="fa-solid fa-angle-up"></i>
        </Fab>
      </div>
    </>
  );
}
