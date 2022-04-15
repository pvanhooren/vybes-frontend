import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/tokenManager";

import history from "./utils/history";
import Loading from "./components/js/Loading";
import Downtime from "./components/js/Downtime";
import Home from "./components/js/Home";
import Navbar from "./components/js/Navbar.js";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenManager);

  const [requestLoading, setRequestLoading] = useState(true);
  const [downtime, setDowntime] = useState(false);

  const { isLoading, error, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0();

  useEffect(() => {
    async function storeToken() {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      const userId = user.sub;

      await axios
        .get(`https://localhost:7086/profiles/${userId}`)
        .then((response) => {
          setRequestLoading(false);
        })
        .catch((e) => {
          if (e.response) {
            if (e.response.status === 404) {
              async function createNewProfile() {
                await axios
                  .post("https://localhost:7086/profiles/new?userId=" + userId)
                  .then((response) => {
                    setRequestLoading(false);
                  })
                  .catch((e) => {
                    console.log(e);
                    setDowntime(true);
                    setRequestLoading(false);
                  });
              }

              createNewProfile();
            } else {
              setDowntime(true);
              setRequestLoading(false);
            }
          } else {
            setDowntime(true);
            setRequestLoading(false);
          }
        });

      await dispatch(setToken(accessToken));
    }

    if (token === null && isAuthenticated) {
      storeToken();
    } else {
      setRequestLoading(false);
    }
  });

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
        <Routes history={history}>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
