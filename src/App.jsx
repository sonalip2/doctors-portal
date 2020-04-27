import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./styles/base.scss";
import PatientsList from "./pages/PatientsList";
import PatientEdit from "./pages/PatientEdit";
import { Provider } from "react-redux";
import { createStore } from "redux";
import createRootReducer from "./reducers";


const store = createStore(createRootReducer, {});

const App = () => (
  <Provider store={store} >
    <Router>
      <div>
        <Route
          exact
          path="/patients"
          component={PatientsList}
        />
        <Route
          exact
          path="/patients/:id"
          component={PatientEdit}
        />
        <Redirect exact from="/" to="/patients" />
      </div>
    </Router>
  </Provider>
);

export default App;
