import React from "react";
import { useSelector } from "react-redux";

import "../sass/_home.scss";

const Home = () => {
  const { displayName } = useSelector((state) => state.accountManager);

  return(
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
  );
};

export default Home;
