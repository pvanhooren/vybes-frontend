import React from 'react'
import { Spinner } from 'react-bootstrap';

import "../sass/_loading.scss";
import logo from '../../images/logo.gif';

function Loading() {
  return (
    <div id="loading">
        <img
          alt="logo"
          src={logo}
          className="logo"
        />

        <h4 className="loading-text">is loading...</h4>

        <Spinner animation="border" className="loading-circle"/>
    </div>
  )
}

export default Loading