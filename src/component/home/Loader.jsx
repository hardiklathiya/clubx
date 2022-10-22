import React from "react";
import { ThreeCircles } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className="loader_container">
      <ThreeCircles
        height="50"
        width="50"
        color="darkblue"
        wrapperStyle={{}}
        wrapperClass="loader"
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="midnightblue"
        innerCircleColor="royalblue"
        middleCircleColor="midnightblue"
      />
    </div>
  );
}
