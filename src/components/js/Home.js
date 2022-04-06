import React from "react";
import * as Icon from "react-bootstrap-icons";

import "../sass/_home.scss";

const Home = () => {
  return (
    <div id="home">
      <div class="form-group has-search">
        <span class="form-control-feedback"><Icon.Search></Icon.Search></span>
        <input type="text" class="form-control" placeholder="Search" />
      </div>
    </div>
  );
};

export default Home;
