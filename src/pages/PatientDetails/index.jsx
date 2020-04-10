import React, { useEffect, useState } from "react";
import s from "./PatientDetails.module.scss";

const PatientDetails = ({ match }) => {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const patientsData = localStorage.getItem("patients");
    if (!patientsData) {
      setIsLoading(false);
      return;
    }

    const patients = JSON.parse(patientsData);
    const foundPatient = patients[match.params.id];
    if (!foundPatient) {
      setIsLoading(false);
      return;
    }

    setPatient(foundPatient);
    setIsLoading(false);
  }, [match.params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!patient) {
    return <div>no patient found on this id</div>;
  }
  return (
    <div className={s.root}>
      <h1>Patient Details</h1>
      <div className={s.container}>
        <div>First Name: {patient.firstName}</div>
        <div>Email: {patient.email}</div>
        <div>Gender: {patient.gender}</div>
        <div>Age: {patient.age}</div>
      </div>
    </div>
  );
};

export default PatientDetails;
