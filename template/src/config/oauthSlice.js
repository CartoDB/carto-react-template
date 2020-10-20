import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const oauthInitialState = {
  oauthApp: {
    clientId: '0m4N2QdVnJ48', // cra-carto oauth app (@carto public user)
    scopes: [
      'datasets:metadata', // list all yoour datasets
    ],
    authorizeEndPoint: 'https://carto.com/oauth2/authorize',
  },
  token: null,
  userInfo: null,
  error: null,
};

export const oauthSlice = createSlice({
  name: 'oauth',
  initialState: oauthInitialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTokenAndUserInfo: (state, action) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { setError, setTokenAndUserInfo, logout } = oauthSlice.actions;

// Get the userInfo once there is a valid token, and set them both into state
export const setTokenAndUserInfoAsync = createAsyncThunk(
  'oauth/setTokenAndUserInfo',
  async (token, thunkApi) => {
    const { userInfoUrl, accessToken } = token;
    const meUrl = `${userInfoUrl}?api_key=${accessToken}`;
    const userInfo = await (await fetch(meUrl)).json();

    thunkApi.dispatch(setTokenAndUserInfo({ token, userInfo }));
  }
);

// Get the credentials, from curren token & userInnfo
const selectToken = (state) => state.oauth.token;
const selectUserInfo = (state) => state.oauth.userInfo;
export const selectCredentials = createSelector(
  [selectToken, selectUserInfo],
  (token, userInfo) => {
    if (!token || !userInfo) return null;

    const credentials = {
      username: userInfo.username,
      apiKey: token.accessToken,
      serverUrl: userInfo.api_endpoints.auth,
    };
    return credentials;
  }
);

export default oauthSlice.reducer;
