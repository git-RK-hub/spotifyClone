export const authEndpoint = "https://accounts.spotify.com/authorize";

export const clientId = "20666281137848e9bdd5d25ab4e3497b";
export const clientSecret = "d173c01078e041459b1a4053f7d29c94";

export const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getCodeFromResponse = () => {
  return window.location.search
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=code&show_dialog=true`;
