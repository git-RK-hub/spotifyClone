import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import "./SongRow.css";
class SongRow extends Component {
  state = {
    albumSongs: [],
    newAlbumReleasesSongs: [],
  };
  async componentDidMount() {
    const newReleases = await this.props.spotify.getNewReleases({
      limit: 40,
      offset: 5,
      country: "IN",
    });
    if (newReleases) {
      this.setState({ albumSongs: [] });
      this.setState({ newAlbumReleasesSongs: [] });
      newReleases.body.albums.items.map(async (item) => {
        const album = await this.props.spotify.getAlbum(item.id);
        if (album) {
          album.body.tracks.items.map(async (track) => {
            let prevUrl;
            const trackById = await this.props.spotify.getTrack(track.id);
            if (trackById) {
              prevUrl = trackById.body.preview_url;
            }
            const t = {
              albumName: album.body.name,
              albumArtists: album.body.artists.map((artist) => artist.name),
              albumImgUrl: album.body.images[1].url,
              trackName: track.name,
              trackId: track.id,
              trackPrevUrl: prevUrl,
            };
            return this.setState({
              newAlbumReleasesSongs: this.state.newAlbumReleasesSongs.concat(t),
            });
          });
        }
        return 0;
      });
    }
  }

  render() {
    const songs = this.state.newAlbumReleasesSongs.map((el) => {
      return el.trackPrevUrl != null ? (
        <div
          key={el.trackId}
          className="songrow__tile"
          onClick={() =>
            this.props.onSetSong({
              prevUrl: el.trackPrevUrl,
              spotify: this.props.spotify,
              playing: this.props.playing,
              audiotag: this.props.audiotag,
              trackName: el.trackName,
              trackImg: el.albumImgUrl,
            })
          }
        >
          <img src={el.albumImgUrl} alt={el.albumName} />
          <h4>{el.trackName}</h4>
          <p>Artist: {el.albumArtists.join(",")}</p>
        </div>
      ) : null;
    });
    return (
      <div className="songrow">
        <h2 className="songrow__heading">{this.props.option}</h2>
        <div className="songrow__row">{songs}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotify: state.spotify,
    playing: state.playing,
    audiotag: state.audiotag,
    newAlbumReleasesSongs: state.newAlbumReleasesSongs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSong: (obj) => dispatch(actions.setSong(obj)),
    // getNewAlbumsSongs: (spotify) =>
    //   dispatch(actions.getNewAlbumReleasesSongs(spotify)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongRow);
