import { Button } from "react-bootstrap";
import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

import "../sass/_home.scss";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const { displayName } = useSelector((state) => state.accountManager);

  return isAuthenticated ? (
    <div id="home">
      <h1 className="page-heading">Welcome to Vybes, { displayName }!</h1>

      <div className="row">
        <div className="col-sm-7 mb-4 mb-md-0">
          <div className="card people-card">
            <div className="card-header">
              People you may know
            </div>
          </div>
        </div>

        <div className="col-sm-5">
          <div className="card groups-card">
            <div className="card-header">
              Groups you may vybe with
            </div>
          </div>
        </div>
      </div>
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
