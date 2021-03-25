import { connect } from "react-redux";
import * as actions from "./store/actions";
const searchSong = (props) => {
  const songs = props.queryTracks.map((el) => {
    return (
      <div
        key={el.trackId}
        className="songrow__tile"
        onClick={() =>
          props.onSetSong({
            audiotag: props.audiotag,
            spotify: props.spotify,
            playing: props.playing,
            songUrl: el.trackUri,
            trackName: el.trackName,
            trackImg: el.trackImg,
          })
        }
      >
        <img src={el.trackImg} alt={el.trackName} />
        <h4>{el.trackName}</h4>
        <p>Artist: {el.trackArtists.join(",")}</p>
      </div>
    );
  });
  return (
    <div className="songrow">
      <h2 className="songrow__heading">{props.option}</h2>
      <div className="songrow__row" style={{ flexWrap: "nowrap" }}>
        {songs}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    queryTracks: state.queryTracks,
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

export default connect(mapStateToProps, mapDispatchToProps)(searchSong);
