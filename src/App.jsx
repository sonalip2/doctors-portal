import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/base.scss";
import PatientsList from "./pages/PatientsList";
import PatientDetails from "./pages/PatientDetails";
import SignUp from "./pages/SignUp";
import withAuthCheck from "./hocs/withAuthCheck";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import PatientCreate from "./pages/PatientCreate";

const App = () => (
  <Router>
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={withAuthCheck(Login, false)} />
      <Route exact path="/signup" component={withAuthCheck(SignUp, false)} />
      <Route
        exact
        path="/dashboard"
        component={withAuthCheck(Dashboard, true)}
      />
      <Route
        exact
        path="/patients"
        component={withAuthCheck(PatientsList, true)}
      />
      <Route
        exact
        path="/patients/create"
        component={withAuthCheck(PatientCreate, true)}
      />
      <Route
        exact
        path="/patients/:id"
        component={withAuthCheck(PatientDetails, true)}
      />
      <Route exact path="/logout" component={withAuthCheck(Logout, true)} />
    </>
  </Router>
);

export default App;
