import React from 'react'

import "../../sass/intervals/_downtime.scss";
import logo from '../../../images/logo.gif';

function Loading() {
  return (
    <div id="loading">
        <img
          alt="logo"
          src={logo}
          className="logo"
        />

        <h4 className="downtime-text">is experiencing downtime :(</h4>

        <h5>Please come back later and try again!</h5>
    </div>
  )
}

export default Loading