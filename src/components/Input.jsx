import React from "react";

const Input = ({ type, placeholder, className, onChange, value, innerref }) => {
  return (
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`input-bordered input w-full ${className}`}
      value={value}
      ref={innerref}
    />
  );
};

export default Input;
