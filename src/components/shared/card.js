import React from "react";

const Card = ({ className, children }) => {
  return <div className={className ? className : "card"}>{children}</div>;
};

export default Card;
