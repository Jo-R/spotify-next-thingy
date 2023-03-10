const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const USER_ENDPOINT = "https://api.spotify.com/v1/me";

// TODO all this auth code is from a blog post - it works but
// revisit based on docs etc to see if can improve. Llke do I need
// a refresh token every time?
// see https://github.com/nextauthjs/next-auth-refresh-token-example
const getAccessToken = async (refresh_token: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async (refresh_token: string) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUserDetails = async (refresh_token: string) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(USER_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
