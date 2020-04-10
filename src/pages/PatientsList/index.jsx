import React from "react";
import s from "./PatientList.module.scss";
// import TableRow from "../TableRow";
import BasicInput from "../../components/BasicInput";
import Button from "../../components/Button";

class PatientList extends React.Component {
  constructor(props) {
    super(props);
    const patientsData = localStorage.getItem("patients");
    this.patients = patientsData ? JSON.parse(patientsData) : [];
    this.dataToDisplay = 5;
    this.state = {
      currentPage: 0,
      patients: [...this.patients].splice(0, this.dataToDisplay),
      sortBy: {
        field: null,
        ascDesc: "asc"
      },
      search: ""
    };
  }

  filterData = (search, currentPage, sortBy) => {
    const newPatients = this.patients.filter(patient => {
      if (
        patient.firstName.indexOf(search) !== -1 ||
        patient.email.indexOf(search) !== -1 ||
        patient.age.indexOf(search) !== -1 ||
        patient.gender.indexOf(search) !== -1
      ) {
        return true;
      }
      return false;
    });

    if (sortBy && sortBy.field) {
      newPatients.sort((row1, row2) => {
        const row1a = row1[sortBy.field].toUpperCase();
        const row2b = row2[sortBy.field].toUpperCase();
        let comparison = 0;
        if (row1a > row2b) {
          comparison = sortBy.ascDesc === "asc" ? 1 : -1;
        } else if (row1a < row2b) {
          comparison = sortBy.ascDesc === "asc" ? -1 : 1;
        }
        return comparison;
      });
    }

    this.setState({
      patients: newPatients.splice(
        currentPage * this.dataToDisplay,
        this.dataToDisplay
      )
    });
  };

  handleSearchChange = e => {
    const { sortBy } = this.state;
    this.setState({ search: e.target.value, currentPage: 1 });
    this.filterData(e.target.value, 0, sortBy);
  };

  handleChangeSortBy = column => {
    const { search, sortBy } = this.state;
    const newSortBy = {
      field: column,
      ascDesc:
        sortBy.field === column && sortBy.ascDesc === "asc" ? "desc" : "asc"
    };
    this.setState({ sortBy: newSortBy, currentPage: 1 });
    this.filterData(search, 0, newSortBy);
  };

  handlePrevClick = () => {
    const { currentPage, search, sortBy } = this.state;
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage < 0) return;
    this.setState({ currentPage: newCurrentPage });
    this.filterData(search, newCurrentPage, sortBy);
  };

  handleNextClick = () => {
    const { currentPage, search, sortBy, patients } = this.state;
    if (patients.length < this.dataToDisplay) {
      return;
    }
    const newCurrentPage = currentPage + 1;
    this.setState({ currentPage: newCurrentPage });
    this.filterData(search, newCurrentPage, sortBy);
  };

  handlePatientClick = id => {
    const { history } = this.props;
    history.push(`/patients/${id}`);
  };

  render() {
    const { search, patients, sortBy } = this.state;

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
                <th
                  className={
                    sortBy.field === "firstName" ? s[sortBy.ascDesc] : undefined
                  }
                  onClick={() => this.handleChangeSortBy("firstName")}
                >
                  First Name
                </th>
                <th
                  className={
                    sortBy.field === "email" ? s[sortBy.ascDesc] : undefined
                  }
                  onClick={() => this.handleChangeSortBy("email")}
                >
                  Email
                </th>
                <th
                  className={
                    sortBy.field === "gender" ? s[sortBy.ascDesc] : undefined
                  }
                  onClick={() => this.handleChangeSortBy("gender")}
                >
                  Gender
                </th>
                <th
                  className={
                    sortBy.field === "age" ? s[sortBy.ascDesc] : undefined
                  }
                  onClick={() => this.handleChangeSortBy("age")}
                >
                  Age
                </th>
              </tr>
            </thead>
            <tbody className={s.body}>
              {patients.map((patient, index) => (
                <tr key={index} onClick={() => this.handlePatientClick(index)}>
                  <td>{patient.firstName}</td>
                  <td>{patient.email}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {this.patients.length > this.dataToDisplay && (
            <div className={s.btnContainer}>
              <Button className="primary" onClick={this.handlePrevClick}>
                Prev
              </Button>
              <Button className="primary" onClick={this.handleNextClick}>
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PatientList;
