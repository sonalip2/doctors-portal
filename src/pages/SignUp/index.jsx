import React, { useState } from "react";
import BasicInput from "../../components/BasicInput";
import Button from "../../components/Button";
import s from "./SignUp.module.scss";

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    const doctor = {
      email,
      password
    };

    const doctorsData = localStorage.getItem("doctors");
    const data = doctorsData ? JSON.parse(doctorsData) : [];
    data.push(doctor);
    localStorage.setItem("signInUser", JSON.stringify(doctor));
    localStorage.setItem("doctors", JSON.stringify(data));
    history.push("/dashboard");
  };

  const onCancelSubmit = () => {
    history.push("/");
  };

  return (
    <div className={s.root}>
      <form onSubmit={onSubmit}>
        <div>
          <BasicInput
            value={email}
            required
            label="Email"
            onChange={handleEmailChange}
            name="email"
            type="email"
          />
          <BasicInput
            value={password}
            required
            label="Password"
            onChange={handlePasswordChange}
            name="password"
            type="password"
          />
        </div>
        <div className={s.btnContainer}>
          <Button className="primary" type="submit">
            Signup
          </Button>
          <Button className="danger" type="button" onClick={onCancelSubmit}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
