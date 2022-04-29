import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import "../sass/_landing.scss";

const Landing = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id="landing">
      <h1>Welcome to Vybes!</h1>
      <p>
        A platform where you can make friends and join groups who may share your
        vybe.
      </p>

      <div className="button-group">
        <Button onClick={() => loginWithRedirect()}>Take me there!</Button>
      </div>
    </div>
  );
};

export default Landing;
