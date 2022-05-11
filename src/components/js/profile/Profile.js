import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { Modal, Button, Form, InputGroup } from "react-bootstrap";

import _profileService from "../../../services/profileService";
import useAccount from "../../../hooks/useAccount";
import axios from "axios";

import * as Icon from "react-bootstrap-icons";
import "../../sass/profile/_profile.scss";
import { setDisplayName, setProfileObject } from "../../../redux/accountManager";

const Profile = () => {
  const account = useAccount();

  const dispatch = useDispatch();

  const { displayName, profileObject } = useSelector(
    (state) => state.accountManager
  );

  const [modifiedProfileObject, setModifiedProfileObject] = useState({});

  const [editing, setEditing] = useState(false);

  const { user, getAccessTokenSilently } = useAuth0();

  function handleChange(event) {
    setModifiedProfileObject({
      ...modifiedProfileObject,
      [event.target.name]: event.target.value,
    });

    console.log(modifiedProfileObject);
  }

  function handleChangePhoneNumber() {}

  async function updateProfile() {
    console.log(modifiedProfileObject);

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUDIENCE,
    });

    // http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    await axios.put("https://localhost:7086/profiles/update", modifiedProfileObject, {
        headers: { Authorization: `Bearer ${accessToken}`},
      })
      .then((response) => {
        setEditing(false);
        dispatch(setDisplayName(modifiedProfileObject.displayName))
        dispatch(setProfileObject(modifiedProfileObject));
      })
      .catch((e) => {
        console.log(e)
        // console.log(e);
      });
  }

  useEffect(() => {
    if (profileObject !== null) {
      setModifiedProfileObject(profileObject);
    }

    console.log(modifiedProfileObject);
  }, [profileObject]);

  return (
    <div id="profile">
      <div className="row top-row">
        <div className="col-md-2 mb-4 mb-md-0">
          <div className="card controls-card">
            <div className="profile-picture-container">
              <img src={user.picture} alt="" className="profile-picture" />
            </div>

            <h5 className="display-name">{displayName}</h5>

            <p> @{profileObject ? profileObject["userName"] : ""} </p>

            <div className="profile-buttons">
              <div className="profile-button" onClick={() => setEditing(true)}>
                Edit appearance
              </div>

              <div className="profile-button">Manage tiles</div>

              <div className="profile-button">Add new tile</div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card about-card">
            <div className="card-header">About</div>

            <div className="card-content">
              {profileObject ? profileObject["about"] : ""}
            </div>
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

      <Modal
        show={editing}
        onHide={() => setEditing(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit appearance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please enter a unique username below, with a maximum of 15
            characters without any special ones.
          </p>

          <InputGroup hasValidation>
            <Form.Control
              type="text"
              required
              // isInvalid={registrationError}
              maxLength={24}
              name="displayName"
              value={modifiedProfileObject.displayName}
              onChange={handleChange}
            />

            {/* <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback> */}
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => updateProfile()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
