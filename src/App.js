import { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  setToken,
  setDisplayName,
  setProfileObject,
} from "./redux/accountManager";
import http from "./services/serviceVariables";

import Loading from "./components/js/intervals/Loading";
import Downtime from "./components/js/intervals/Downtime";
import Home from "./components/js/Home";
import Profile from "./components/js/profile/Profile";
import Navbar from "./components/js/Navbar.js";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const { token, profileObject } = useSelector((state) => state.accountManager);

  const [requestLoading, setRequestLoading] = useState(true);
  const [downtime, setDowntime] = useState(false);
  const [registering, setRegistering] = useState(false);

  const [registrationUserName, setRegistrationUserName] = useState("");

  const [registrationError, setRegistrationError] = useState(false);
  const [message, setMessage] = useState("");

  const { isLoading, error, isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    async function userExists() {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
      });

      // http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      await dispatch(setDisplayName(user.name));

      await http
        .get(`/profiles/uid/${user.sub}`, { headers: {
          Authorization: `Bearer ${accessToken}`
        }})
        .then((response) => {
          let displayNameFromResponse = response.data.displayName;

          if (
            displayNameFromResponse !== "" &&
            displayNameFromResponse !== null
          ) {
            dispatch(setDisplayName(response.data.displayName));
          }

          dispatch(setProfileObject(response.data));

          setRequestLoading(false);
        })
        .catch((e) => {
          if (e.response) {
            if (e.response.status === 404) {
              setRegistering(true);
              setRequestLoading(false);
            } else {
              setRequestLoading(false);
            }
          } else {
            setDowntime(true);
            setRequestLoading(false);
          }
        });

      await dispatch(setToken(accessToken));
    }

    if ((token === null || profileObject === null) && isAuthenticated) {
      userExists();
    } else {
      setRequestLoading(false);
    }
  }, [ user ]);

  async function createProfile(providedUserName) {
    const nospecial = /^(\d|\w)+$/;

    let result = nospecial.test(providedUserName);

    if (providedUserName.length == 0) {
      setRegistrationError(true);
      setMessage("Please choose a username before registering.");
    } else if (providedUserName.length > 15) {
      setRegistrationError(true);
      setMessage(
        "The username can be 15 characters max. Please remove some characters"
      );
    } else if (!result) {
      setRegistrationError(true);
      setMessage(
        "This username contains special characters. Please remove them"
      );
    } else {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
      });

      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      await http
        .post(
          "/profiles/new?userId=" +
            user.sub +
            "&userName=" +
            providedUserName
        )
        .then((response) => {
          setRegistering(false);
        })
        .catch((e) => {
          console.log(e);

          setRegistrationError(true);
          setMessage(
            "This username seems to be in use already. Please choose another one!"
          );
        });
    }
  }

  function setRegistrationUserNameInterceptor(userName) {
    setRegistrationError(false);
    setRegistrationUserName(userName);
  }

  if (error || downtime) {
    return <Downtime />;
  }

  if (isLoading || requestLoading) {
    return <Loading />;
  }

  return (
    <div id="app">
      <Navbar />

      <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </div>

      <Modal
        show={registering}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Your registration is almost complete!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please enter a unique username below, with a maximum of 15
            characters without any special ones.
          </p>

          <InputGroup hasValidation>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="text"
              required
              isInvalid={registrationError}
              maxLength={15}
              onChange={(e) =>
                setRegistrationUserNameInterceptor(e.target.value)
              }
            />

            <Form.Control.Feedback type="invalid">
              {message}
            </Form.Control.Feedback>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProfile(registrationUserName)}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
