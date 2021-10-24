import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../header/Header";
import SearchSong from "../search_song/SearchSong";
import SongRow from "../song_row/SongRow";
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
