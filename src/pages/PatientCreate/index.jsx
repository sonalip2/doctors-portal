import React, { Component } from "react";
import BasicInput from "../../components/BasicInput";
import Button from "../../components/Button";
import s from "./PatientCreate.module.scss";

class PatientCreate extends Component {
  state = {
    firstName: "",
    email: "",
    age: "",
    gender: ""
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    const { firstName, email, gender, age } = this.state;
    const patient = {
      firstName,
      email,
      gender,
      age
    };
    const patientsData = localStorage.getItem("patients");
    const data = patientsData ? JSON.parse(patientsData) : [];
    data.push(patient);
    localStorage.setItem("patients", JSON.stringify(data));
    history.push("/patients");
  };

  onCancelSubmit = () => {
    const { history } = this.props;
    history.push("/dashboard");
  };

  render() {
    const { firstName, email, age } = this.state;
    const genderRadio = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" }
    ];
    return (
      <div className={s.root}>
        <form onSubmit={this.onSubmit}>
          <div>
            <BasicInput
              value={firstName}
              required
              label="First Name"
              onChange={this.handleInputChange}
              name="firstName"
            />
            <BasicInput
              value={email}
              required
              label="Email"
              onChange={this.handleInputChange}
              name="email"
              type="email"
            />
            <BasicInput
              value={age}
              required
              label="Age"
              onChange={this.handleInputChange}
              name="age"
              type="number"
              min="0"
              max="90"
            />
            {genderRadio.map((g, index) => {
              return (
                <BasicInput
                  key={index}
                  value={g.value}
                  required
                  label={g.label}
                  onChange={this.handleInputChange}
                  name="gender"
                  type="radio"
                />
              );
            })}
          </div>
          <div className={s.btnContainer}>
            <Button className="primary" type="submit">
              Save
            </Button>
            <Button
              className="danger"
              type="button"
              onClick={this.onCancelSubmit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default PatientCreate;
