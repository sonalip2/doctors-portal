import React, { useState } from "react";
import BasicInput from "../../components/BasicInput";
import Button from "../../components/Button";
import s from "./Login.module.scss";

const Login = ({ history }) => {
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

    const doctorsData = localStorage.getItem("doctors");
    if (!doctorsData) {
      return false;
    }

    const doctors = JSON.parse(doctorsData);

    let foundDoctor = null;
    for (let i = 0; i < doctors.length; i++) {
      const doctor = doctors[i];
      if (doctor.email === email && doctor.password === password) {
        foundDoctor = doctor;
        break;
      }
    }

    if (!foundDoctor) {
      return false;
    }

    localStorage.setItem("signInUser", JSON.stringify(foundDoctor));
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
            Login
          </Button>
          <Button className="danger" type="button" onClick={onCancelSubmit}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
