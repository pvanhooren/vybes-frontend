import { Button } from "react-bootstrap";
import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import "../sass/_home.scss";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return isAuthenticated ? (
    <div id="home">
      <h1>Welcome to Vybes!</h1>
    </div>
  ) : (
    <div id="home" className="not-authenticated">
      <h1>Welcome to Vybes!</h1>
      <p>
        A platform where you can make friends and join groups who may share your vybe.
      </p>

      <div className="button-group">
        <Button onClick={ () => loginWithRedirect() }>Take me there!</Button>
      </div>
    </div>
  );
};

export default Home;
