import React from "react";
import "./index.css";
import { Blocks } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Loader = () => {
  const User = useSelector(({ User }) => User);
  const { isLoading } = User;
  return (
    <div className={`loader-container ${isLoading && "showLoader"}`}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
      <div className="loader-text">Processing...</div>
    </div>
  );
};

export default Loader;
