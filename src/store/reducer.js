import * as actionTypes from "./actionTypes";

const initialState = {
  spotify: null,
  accessToken: null,
  refToken: null,
  userName: "",
  userId: null,
  playlists: [],
  playListSong: [],
  showPlayList: false,
  playing: false,
  newAlbumReleasesSongs: [],
  audiotag: new Audio(),
  currentTrack: null,
  currTrackImg: "",
  currTrackUrl: null,
  queryTracks: [],
  showQueryTracks: false,
};

const reducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case actionTypes.SET_SHOW_QUERY_TRACKS:
      return {
        ...state,
        showQueryTracks: action.value,
      };
    case actionTypes.SET_QUERY_TRACKS:
      return {
        ...state,
        queryTracks: action.queryTracks,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        userName: action.userName,
        userId: action.userId,
      };
    case actionTypes.SET_SONG_DETAIL:
      return {
        ...state,
        currentTrack: action.trackName,
        currTrackImg: action.trackImg,
        currTrackUrl: action.trackPrevUrl,
      };
    case actionTypes.SET_NEW_ALBUM_RELEASES:
      const t = {
        ...state,
      };
      console.log(t.newAlbumReleasesSongs.concat(action.new));
      // const s = t.newAlbumReleasesSongs.concat(action.new);
      // t.newAlbumReleasesSongs = s;
      return {
        state,
      };
    case actionTypes.SET_PLAYING:
      return {
        ...state,
        playing: action.value,
      };

    case actionTypes.SET_PLAYLISTSONG:
      return {
        ...state,
        playListSong: action.playListSong,
      };
    case actionTypes.SET_USER_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case actionTypes.SET_SPOTIFY:
      return {
        ...state,
        spotify: action.spotify,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        accessToken: action.token,
      };
    case actionTypes.SET_REFTOKEN:
      return {
        ...state,
        refToken: action.refToken,
      };
    default:
      return state;
  }
};

export default reducer;
