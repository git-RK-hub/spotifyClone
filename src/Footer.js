import React from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import { Grid, Slider } from "@material-ui/core";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./Footer.css";
class Footer extends React.Component {
  audioRef = React.createRef();

  togglePlaying = (play) => {
    this.props.togglePlaying(play);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.playing) {
      this.audioRef.current.play();
    } else {
      this.audioRef.current.pause();
    }
  }
  render() {
    return (
      <>
        <audio
          src={this.props.currTrackUrl}
          ref={this.audioRef}
          onEnded={() => this.togglePlaying(true)}
        />
        <div className="footer">
          <div className="footer__left">
            <img
              className="footer__albumLogo"
              src={this.props.currTrackImg}
              alt={this.props.currentTrack}
            />
            <div className="footer__songInfo">
              {this.props.currentTrack ? (
                <h4>{this.props.currentTrack}</h4>
              ) : (
                <h4>No song is playing</h4>
              )}
              <p>...</p>
            </div>
          </div>
          <div className="footer__center">
            <ShuffleIcon className="footer__green" />
            <SkipPreviousIcon className="footer__icon" />
            {!this.props.playing ? (
              <PlayCircleFilledWhiteIcon
                fontSize="large"
                className="footer__green"
                onClick={() => this.togglePlaying(false)}
              />
            ) : (
              <PauseCircleFilledIcon
                fontSize="large"
                className="footer__green"
                onClick={() => this.togglePlaying(true)}
              />
            )}
            <SkipNextIcon className="footer__icon" />
            <RepeatIcon className="footer__green" />
          </div>
          <div className="footer__right">
            <Grid container spacing={2}>
              <Grid item>
                <PlaylistPlayIcon />
              </Grid>
              <Grid item>
                <VolumeDownIcon />
              </Grid>
              <Grid item xs>
                <Slider aria-labelledby="continuous-slider" />
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTrack: state.currentTrack,
    currTrackImg: state.currTrackImg,
    currTrackUrl: state.currTrackUrl,
    playing: state.playing,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    togglePlaying: (value) => dispatch(actions.setPlaying(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
