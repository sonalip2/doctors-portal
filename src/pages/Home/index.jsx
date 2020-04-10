import React from "react";
import { Link } from "react-router-dom";
import s from "./Home.module.scss";

const Home = () => (
  <div className={s.root}>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
  </div>
);

export default Home;
