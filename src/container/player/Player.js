import React, { Component } from "react";
import Body from "../../components/body/Body";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";

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
