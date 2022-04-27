import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import _profileService from "../../../services/profileService";
import http from "../../../services/serviceVariables";

import * as Icon from "react-bootstrap-icons";
import "../../sass/profile/_profile.scss";

const Profile = () => {
  const { displayName, token, profileObject } = useSelector(
    (state) => state.accountManager
  );

  const [modifiedProfileObject, setModifiedProfileObject] = useState(profileObject);

  const { user } = useAuth0();

  useEffect(() => {
    console.log(modifiedProfileObject);
  }, [user]);

  return (
    <div id="profile">
      <div className="row top-row">
        <div className="col-md-2 mb-4 mb-md-0">
          <div className="card controls-card">
            <div className="profile-picture-container">
              <img src={user.picture} alt="" className="profile-picture" />
            </div>

            <h5 className="display-name">{displayName}</h5>

            <p> @{modifiedProfileObject['userName']} </p>

            <div className="profile-buttons">
              <div className="profile-button">Edit appearance</div>

              <div className="profile-button">Manage tiles</div>

              <div className="profile-button">Add new tile</div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card about-card">
            <div className="card-header">About</div>

            <div className="card-content"></div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card friends-card">
            <div className="card-header">Friends</div>

            <div className="friends-grid"></div>
          </div>
        </div>
      </div>

      <div className="row bottom-row">
        <div className="col-md-7 mb-4 mb-md-0">
          <div className="card krabbel-card">
            <div className="card-header">Krabbels</div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card groups-card">
            <div className="card-header">Groups</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
