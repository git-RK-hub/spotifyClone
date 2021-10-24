import React from "react";
import { connect } from "react-redux";
import Sidebaroption from "./sidebar_options/Sidebaroption";
import PlaylistRow from "./playlist/PlaylistRow";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicOutlinedIcon from "@material-ui/icons/LibraryMusicOutlined";
import "./Sidebar.css";
import * as actions from "../../store/actions";
class Sidebar extends React.Component {
  componentDidMount() {
    this.props.getUserPlaylists(this.props.spotify);
  }

  render() {
    return (
      <div className="sidebar">
        <img
          className="sidebar__logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
        <Sidebaroption
          option="Home"
          Icon={HomeIcon}
          clicked={() => this.props.showQueryTracks(false)}
        />
        {/* <Sidebaroption option="Search" Icon={SearchIcon} clicked={this.addInput}/> */}
        <Sidebaroption option="Your library" Icon={LibraryMusicOutlinedIcon} />

        <br />
        <strong className="sidebar__title">PLAYLISTS</strong>
        <hr />
        <div className="sidebar__playlist">
          {this.props.playlists.map((el) => {
            return (
              <PlaylistRow
                key={el.playListId}
                id={el.playListId}
                name={el.playListName}
                url={el.playListUrl}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    spotify: state.spotify,
    playlists: state.playlists,
    showQueryTracks: state.showQueryTracks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPlaylists: (spotify) => dispatch(actions.get_User_Playists(spotify)),
    showQueryTracks: (val) => dispatch(actions.setShowQueryTracks(val)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
