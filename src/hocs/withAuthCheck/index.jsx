import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const withAuthCheck = (WrappedComponent, isProtected) =>
  class extends Component {
    render() {
      const signInUser = localStorage.getItem("signInUser");

      if (signInUser && !isProtected) {
        return <Redirect to="/dashboard" />;
      }

      if (!signInUser && isProtected) {
        return <Redirect to="/" />;
      }

      return <WrappedComponent user={this.user} {...this.props} />;
    }
  };

export default withAuthCheck;
