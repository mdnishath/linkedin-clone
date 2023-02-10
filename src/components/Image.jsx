import React from "react";

const Image = ({ src, className }) => {
  return (
    <img className={className} referrerPolicy="no-referrer" src={src} alt="" />
  );
};

export default Image;
