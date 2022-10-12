import React from "react";
export default function BackShadow({ isOpen, toggleDrawer }) {
  const backDropStyle = {
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: "0%",
    left: "0%",
    zIndex: "20",
    backgroundColor: "rgba(0,0,0,0.5)",
  };
  return (
    <div>
      {isOpen && <div style={backDropStyle} onClick={toggleDrawer}></div>}
    </div>
  );
}
