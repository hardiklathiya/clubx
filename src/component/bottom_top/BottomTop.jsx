import React, { useEffect, useState } from "react";
import "./bottomtop.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function BottomTop() {
  const [showBtmTopBtn, setshowBtmTopBtn] = useState(false);
  const bottomTopBtn = document.querySelector(".bottomTop");

  const BottomTop = () => {
    if (
      //   document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      setshowBtmTopBtn(true);
    } else {
      setshowBtmTopBtn(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };
  window.addEventListener("scroll", BottomTop);
  return (
    <>
      {showBtmTopBtn && (
        <div className="bottomTop" onClick={scrollToTop}>
          <KeyboardArrowUpIcon className="bottom_top_btn" href="#bottom_top" />
        </div>
      )}
    </>
  );
}
