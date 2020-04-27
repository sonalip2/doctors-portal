import React, { Component } from "react";
import { connect } from "react-redux";
import BasicInput from "../../components/BasicInput";
import Button from "../../components/Button";
import s from "./PatientEdit.module.scss";
import * as patientActions from "../../actions/patientActions";

class PatientEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      address: ""
    };
  }
  componentDidMount() {
    const { updatedPatients, match: { params: { id } } } = this.props;
    const patient = updatedPatients[parseInt(id)]
    if (!patient) {
      this.redirectBack()
    }
    this.setState({ ...this.state, ...patient })
  }

  redirectBack = () => {
    const { history } = this.props;
    history.push('/patients')
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { history, updatedPatients, setUpdatedPatients, match: { params: { id } } } = this.props;
    const { name, username, email, phone, company, website, address } = this.state;
    const patient = {
      name,
      username,
      email,
      phone,
      company,
      website,
      address,
      id: parseInt(id)
    };

    const newUpdatePatients = {
      [patient.id]: patient,
    };
    setUpdatedPatients({ ...updatedPatients, ...newUpdatePatients });
    history.push("/patients");
  };

  onCancelSubmit = () => {
    const { history } = this.props;
    history.push({
      pathname: '/patients',
      state: { edit: true }
    })
  };

  render() {
    const { name, email, phone, company, website, address } = this.state;

    return (
      <div className={s.root}>
        <form onSubmit={this.onSubmit}>
          <div>
            <BasicInput
              value={name}
              required
              label="Name"
              onChange={this.handleInputChange}
              name="name"
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
              value={phone}
              required
              label="phone"
              onChange={this.handleInputChange}
              name="phone"
              type="tel"
            />
            <BasicInput
              value={company}
              required
              label="company"
              onChange={this.handleInputChange}
              name="company"
            />
            <BasicInput
              value={website}
              required
              label="website"
              onChange={this.handleInputChange}
              name="website"
            />
            <BasicInput
              value={address}
              required
              label="address"
              onChange={this.handleInputChange}
              name="address"
            />
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

export default connect(
  state => ({
    updatedPatients: state.patients.updatedPatients,
  }),
  dispatch => ({
    setUpdatedPatients: patients => {
      dispatch(patientActions.setUpdatedPatients(patients))
    },
  }))(PatientEdit);