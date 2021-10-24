import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./Playlistrow.css";
class PlaylistRow extends Component {
  state = {
    playListSong: [],
    showPlaylist: false,
  };

  componentDidMount() {
    let _playlistSong = [];
    this.props.spotify
      .getPlaylist(this.props.id)
      .then((res) => {
        _playlistSong = res.body.tracks.items.map((el) => {
          const t = {
            trackImg: el.track.album.images[2].url,
            trackId: el.track.id,
            trackName: el.track.name,
            trackUri: el.track.uri,
            trackArtists: el.track.artists.map((artist) => artist.name),
          };
          return t;
        });
        this.setState({ playListSong: _playlistSong });
      })
      .catch((err) => console.log(err));
  }

  onTogglePlaylist = () => {
    this.setState({ showPlaylist: !this.state.showPlaylist });
  };

  render() {
    let list = this.state.playListSong?.map((el) => {
      return (
        <p
          key={el.trackId}
          className="playlist_row_song"
          onClick={() =>
            this.props.onSetSong({
              audiotag: this.props.audiotag,
              spotify: this.props.spotify,
              playing: this.props.playing,
              songUrl: el.trackUri,
              trackName: el.trackName,
              trackImg: el.trackImg,
            })
          }
        >
          {el.trackName}
        </p>
      );
    });

    return (
      <React.Fragment>
        <div className="playlist__row">
          <p onClick={() => this.onTogglePlaylist()}>{this.props.name}</p>
        </div>
        {this.state.showPlaylist && list}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotify: state.spotify,
    audiotag: state.audiotag,
    playing: state.playing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSong: (obj) => dispatch(actions.setSong(obj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistRow);
