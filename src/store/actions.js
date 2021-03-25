import * as actionTypes from "./actionTypes";
import axios from "axios";
import querystring from "querystring";
import SpotifyWebApi from "spotify-web-api-node";

import {
  getCodeFromResponse,
  clientId,
  clientSecret,
  redirectUri,
} from "../spotify";

export const setUserPlayists = (playlists) => {
  return {
    type: actionTypes.SET_USER_PLAYLISTS,
    playlists: playlists,
  };
};

export const get_User_Playists = (spotify) => {
  return (dispatch) => {
    spotify
      .getUserPlaylists()
      .then((res) => {
        const playLists = res.body.items.map((el) => {
          const p = {
            playListName: el.name,
            playListUrl: el.tracks.href,
            playListId: el.id,
          };
          return p;
        });
        dispatch(setUserPlayists(playLists));
      })
      .catch((err) => console.log(err.message));
  };
};

export const setToken = (token) => {
  return {
    type: actionTypes.SET_TOKEN,
    token: token,
  };
};

export const setRefToken = (refToken) => {
  return {
    type: actionTypes.SET_REFTOKEN,
    refToken: refToken,
  };
};

export const setSpotify = (spotify) => {
  return {
    type: actionTypes.SET_SPOTIFY,
    spotify: spotify,
  };
};

export const getSpotify = () => {
  return (dispatch) => {
    const spotify = new SpotifyWebApi({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    });
    const code = getCodeFromResponse();
    const data = {
      grant_type: "authorization_code",
      code: code.code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    };

    const headers = {
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        querystring.stringify(data),
        headers
      )
      .then((res) => {
        const _token = res.data.access_token;
        const _refreshToken = res.data.refresh_token;
        spotify.setAccessToken(_token);
        spotify.setRefreshToken(_refreshToken);
        dispatch(setToken(_token));
        dispatch(setRefToken(_refreshToken));
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(setSpotify(spotify));
  };
};

export const setPlaylistSong = (playlistsong) => {
  return {
    type: actionTypes.SET_PLAYLISTSONG,
    playListSong: playlistsong,
  };
};

export const setPlaying = (value) => {
  return {
    type: actionTypes.SET_PLAYING,
    value: !value,
  };
};

export const setSongDetail = (trackName, img, url) => {
  return {
    type: actionTypes.SET_SONG_DETAIL,
    trackName: trackName,
    trackImg: img,
    trackPrevUrl: url,
  };
};

export const setSong = (obj) => {
  return (dispatch) => {
    if (obj.playing) {
      dispatch(setPlaying(true));
    }
    if (obj.prevUrl && obj.prevUrl !== null) {
      dispatch(setSongDetail(obj.trackName, obj.trackImg, obj.prevUrl));
      dispatch(setPlaying(false));
    } else {
      const trackId = obj.songUrl.split(":")[2];
      obj.spotify.getTrack(trackId).then(
        (data) => {
          dispatch(
            setSongDetail(obj.trackName, obj.trackImg, data.body.preview_url)
          );
          dispatch(setPlaying(false));
        },
        (err) => {
          console.error(err);
        }
      );
    }
  };
};

export const playSong = () => {
  console.log("playing...");
};

export const setUser = (id, name) => {
  return {
    type: actionTypes.SET_USER,
    userId: id,
    userName: name,
  };
};

export const getMyProfile = (spotify) => {
  return (dispatch) => {
    spotify.getMe().then((res) => {
      dispatch(setUser(res.body.id, res.body.display_name));
    });
  };
};

export const setShowQueryTracks = (value) => {
  return {
    type: actionTypes.SET_SHOW_QUERY_TRACKS,
    value: value,
  };
};

export const setQueryTracks = (tracks) => {
  return {
    type: actionTypes.SET_QUERY_TRACKS,
    queryTracks: tracks,
  };
};

export const getQueryTracks = (spotify, query) => {
  return (dispatch) => {
    spotify.searchTracks(`track:${query}`).then((res) => {
      console.log(res.body);
      const _playlistSong = res.body.tracks.items.map((el) => {
        const t = {
          trackImg: el.album.images[1].url || "",
          trackId: el.id,
          trackName: el.name,
          trackUri: el.uri,
          trackArtists: el.artists.map((artist) => artist.name),
        };
        return t;
      });
      dispatch(setQueryTracks(_playlistSong));
      dispatch(setShowQueryTracks(true));
    });
  };
};

// export const setNewAlbumReleasesSongs = (tracks) => {
//   return (dispatch) => {
//     let albumsSongs = [];
//     albumsSongs = albumsSongs.concat(tracks);
//   };
// };

// export const getNewAlbumReleasesSongs = (spotify) => {
//   return async (dispatch) => {
//       const newReleases = await spotify.getNewReleases({
//       limit: 10,
//       offset: 0,
//       country: "IN",
//     });
//     if (newReleases) {
//       dispatch(setNewAlbumReleasesSongs([]));
//       newReleases.body.albums.items.map(async (item) => {
//         const album = await spotify.getAlbum(item.id);
//         if (album) {
//           album.body.tracks.items.map(async (track) => {
//             let prevUrl;
//             const trackById = await this.props.spotify.getTrack(track.id);
//             if (trackById) {
//               prevUrl = trackById.body.preview_url;
//             }
//             const t = {
//               albumName: album.body.name,
//               albumArtists: album.body.artists.map((artist) => artist.name),
//               albumImgUrl: album.body.images[1].url,
//               trackName: track.name,
//               trackId: track.id,
//               trackPrevUrl: prevUrl,
//             };
//             return this.setState({
//               newAlbumReleasesSongs: this.state.newAlbumReleasesSongs.concat(t),
//             });
//           });
//         }
//         return 0;
//       });
//     }
//   };
// };
