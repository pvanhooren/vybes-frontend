import React, { useState, useEffect } from "react";

import "../../sass/profile/_profile.scss";

const Profile = () => {
  useEffect(() => {
    
  });

  return (
    <div id="profile">
      <div className="row top-row">
        <div className="col-md-2">
          <div className="card">Profile interaction</div>
        </div>

        <div className="col-md-6">
          <div className="card">Profile text</div>
        </div>

        <div className="col-md-4">
          <div className="card">Friends</div>
        </div>
      </div>

      <div className="row bottom-row">
        <div className="col-md-7">
          <div className="card">Krabbel wall</div>
        </div>

        <div className="col-md-5">
          <div className="card">Groups</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
