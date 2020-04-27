import React from "react";
import { connect } from "react-redux";
import s from "./PatientList.module.scss";
import BasicInput from "../../components/BasicInput";
import Button from "../../components/Button";
import PatientItem from "./PatientItem";
import { getPatients } from '../../service/patients';
import * as patientActions from "../../actions/patientActions";

class PatientList extends React.Component {
  constructor(props) {
    super(props);

    this.dataToDisplay = 5;
    this.state = {
      patients: [],
      currentPage: 1,
      search: ""
    };
  }

  componentDidMount() {
    this.setPatientsData();
  }

  setPatientsData = async (search = "", page = 1, limit = this.dataToDisplay) => {
    const patients = await getPatients(page, limit, search);
    this.setState({ patients });
  }

  handleSearchChange = e => {
    this.setState({ search: e.target.value, currentPage: 1 });
    this.setPatientsData(e.target.value);
  };

  handlePrevClick = () => {
    const { currentPage, search } = this.state;
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage < 1) return;
    this.setState({ currentPage: newCurrentPage });
    this.setPatientsData(search, newCurrentPage);
  };

  handleNextClick = () => {
    const { currentPage, search, patients } = this.state;
    if (patients.length < this.dataToDisplay) {
      return;
    }
    const newCurrentPage = currentPage + 1;
    this.setState({ currentPage: newCurrentPage });
    this.setPatientsData(search, newCurrentPage);
  };

  render() {
    const { search, patients } = this.state;
    const { updatedPatients } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <BasicInput
            value={search}
            key="basic-input"
            onChange={this.handleSearchChange}
          />
          <table className={s.table}>
            <thead className={s.head}>
              <tr>
                <th  >
                  Name
                </th>
                <th  >
                  Username
                </th>
                <th>
                  Email
                </th>
                <th>
                  phone
                </th>
                <th>Company</th>
                <th>
                  Expand
                </th>
              </tr>
            </thead>
            <tbody className={s.body}>
              {
                patients.length > 0 && patients.map((patient, index) => (
                  <PatientItem patient={updatedPatients[patient.id] ? updatedPatients[patient.id] : patient} key={patient.id} />
                ))
              }
            </tbody>
          </table>
          <div className={s.btnContainer}>
            <Button className="primary" onClick={this.handlePrevClick}>
              Prev
              </Button>
            <Button className="primary" onClick={this.handleNextClick}>
              Next
              </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    updatedPatients: state.patients.updatedPatients
  }))(PatientList);
