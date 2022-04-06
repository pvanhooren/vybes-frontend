import { Routes, Route } from "react-router-dom";

import history from "./utils/history";
import Home from "./components/js/Home";
import Navbar from "./components/js/Navbar.js";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

function App() {
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
