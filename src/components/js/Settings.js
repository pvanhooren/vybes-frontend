import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import useAccount from "../../hooks/useAccount";
import axios from "axios";

const Settings = () => {
  const account = useAccount();

  const dispatch = useDispatch();

  const { displayName, profileObject, token } = useSelector(
    (state) => state.accountManager
  );

  const { logout } = useAuth0();

  async function deleteProfile() {
    await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/profiles/delete`, {
        headers: { Authorization: `Bearer ${token}`},
        data : profileObject
      })

      logout();
  }

  useEffect(() => {
    console.log(profileObject);
    console.log(token);
  });

  return (
    <div id="settings">
      <h1 className="page-heading">Settings</h1>

      <button className="btn btn-danger" onClick={() => deleteProfile()}>Delete profile</button>
    </div>
  );
};

export default Settings;
