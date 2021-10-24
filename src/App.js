import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import Player from "./container/player/Player";
import Login from "./container/login/Login";
import "./App.css";

class App extends Component {
  componentWillMount() {
    this.props.connectSpotify();
  }
  render() {
    return (
      <div className="app">
        {/* <Player token={this.state.token} id={this.state.userId} /> */}
        {this.props.token ? <Player /> : <Login />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotify: state.spotify,
    token: state.accessToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    connectSpotify: () => dispatch(actions.getSpotify()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
