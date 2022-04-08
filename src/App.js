import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import history from "./utils/history";
import Loading from './components/js/Loading';
import Home from "./components/js/Home";
import Navbar from "./components/js/Navbar.js";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

function App() {
  const { isLoading, error } = useAuth0();

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
