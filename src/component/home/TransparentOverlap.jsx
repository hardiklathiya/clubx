import React from "react";

export default function TransparentOverlap({ priceInfo, toggle }) {
  const backDropStyle = {
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: "0%",
    left: "0%",
    zIndex: "20",
  };
  return (
    <div>{priceInfo && <div style={backDropStyle} onClick={toggle}></div>}</div>
  );
}
