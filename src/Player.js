import React, { Component } from "react";
import Body from "./Body";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

import "./Player.css";
class Player extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="player__page">
          <Sidebar />
          <Body />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Player;
