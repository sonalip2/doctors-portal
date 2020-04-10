import React from "react";
import { Link } from "react-router-dom";
import s from "./Dashboard.module.scss";

const Dashboard = () => (
  <div className={s.root}>
    <Link to="/patients">Patient List</Link>
    <Link to="/patients/create">Create Patient</Link>
    <Link to="/logout">Logout</Link>
  </div>
);

export default Dashboard;
