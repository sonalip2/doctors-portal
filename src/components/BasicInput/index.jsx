import React from "react";
import s from "./BasicInput.module.scss";

const BasicInput = ({ label, className, ...rest }) => (
  <div className={s.basicInput}>
    <label>{label}</label>
    <input {...rest} />
  </div>
);

export default BasicInput;
