import React from "react";
import s from "./Button.module.scss";

const Button = ({ children, className, ...rest }) => (
  <button className={`${s.button} ${className ? className : ""}`} {...rest}>
    {children}
  </button>
);

export default Button;
