import React from "react";

export default function Sidebar(props) {
  const sidebarStyle = {
    top: "0%",
    zIndex: "1000",
    backgroundColor: "yellow",
    width: "60%",
    height: "100vh",
    transition: "1s ease-in-out",
    transform: `translateX(${(props) => (props.isOpen ? "0%" : "-100%")})`,
  };
  return <>{props.isOpen && <div style={sidebarStyle}></div>}</>;
}
