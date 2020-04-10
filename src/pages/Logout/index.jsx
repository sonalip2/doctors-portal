import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    localStorage.removeItem("signInUser");
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <div>Logging out...</div>;
  }
  return <Redirect to="/" />;
};

export default Logout;
