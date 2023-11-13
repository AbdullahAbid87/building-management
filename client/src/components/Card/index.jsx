import React from "react";
import "./index.css";

const Card = (props) => {
  const cardClasses = `${props.className || ""} card`;

  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;
