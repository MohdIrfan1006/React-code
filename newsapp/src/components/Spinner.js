import React from "react";
import loading from "../Ajax-loader.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="Loading..." />
    </div>
  );
};

export default Spinner;
