import { Button } from "react-bootstrap";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "../sass/_home.scss";

const Home = () => {
  const { token } = useSelector((state) => state.tokenManager);

  return (
    <div id="home">
      <h1>Welcome to Vybes!</h1>
    </div>
  );
};

export default Home;
