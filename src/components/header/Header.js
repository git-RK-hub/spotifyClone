import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./Header.css";
class Header extends Component {
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.props.onSearchTracks(this.props.spotify, e.target.value);
    }
  };
  componentDidMount() {
    this.props.getMyProfile(this.props.spotify);
  }

  render() {
    return (
      <div className="header">
        <div className="header__search">
          <input
            type="search"
            name="search"
            placeholder="Search track"
            onKeyPress={this.handleKeyPress}
          />
          <div className="header__profile__icon">
            {this.props.userName.split("")[0]}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotify: state.spotify,
    userName: state.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyProfile: (spotify) => dispatch(actions.getMyProfile(spotify)),
    onSearchTracks: (spotify, query) =>
      dispatch(actions.getQueryTracks(spotify, query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
