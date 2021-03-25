import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import SearchSong from "./SearchSong";
import SongRow from "./SongRow";
import "./Body.css";
class Body extends Component {
  state = {
    searched: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showQueryTracks !== this.props.showQueryTracks) {
      this.setState({ searched: <SearchSong option="Searched" /> });
    }
  }
  render() {
    return (
      <div className="body">
        <Header />
        {this.props.showQueryTracks ? this.state.searched : null}
        <SongRow option="New releases" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showQueryTracks: state.showQueryTracks,
  };
};

export default connect(mapStateToProps)(Body);
