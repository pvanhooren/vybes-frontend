import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/tokenManager";

import history from "./utils/history";
import Loading from './components/js/Loading';
import Home from "./components/js/Home";
import Navbar from "./components/js/Navbar.js";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.tokenManager);

  const { isLoading, error, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function storeToken() {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
      });

      dispatch(setToken(accessToken));
    }

    if (token === null && isAuthenticated) {
      storeToken();
    } 
  });

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
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
