import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const createOauthCartoSlice = (initialState) => {
  const state = loadOAuthState(initialState);

  const slice = createSlice({
    name: 'oauth',
    initialState: {
      token: null,
      userInfo: null,
      ...state,
    },
    reducers: {
      setOAuthApp: (state, action) => {
        const oauthApp = action.payload;
        state.oauthApp = { ...state.oauthApp, ...oauthApp };
      },
      setTokenAndUserInfo: (state, action) => {
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;

        saveOAuthState(state);
      },
      logout: (state) => {
        state.token = null;
        state.userInfo = null;
        saveOAuthState(state);
      },
    },
  });

  return slice.reducer;
};

export const setOAuthApp = (payload) => ({ type: 'oauth/setOAuthApp', payload });
export const setTokenAndUserInfo = (payload) => ({
  type: 'oauth/setTokenAndUserInfo',
  payload,
});
export const logout = (payload) => ({ type: 'oauth/logout', payload });

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

// Get the credentials, from curren token & userInfo
const selectToken = (state) => state.oauth.token;
const selectUserInfo = (state) => state.oauth.userInfo;

export const selectOAuthCredentials = createSelector(
  [selectToken, selectUserInfo],
  (token, userInfo) => {
    if (!token || !userInfo) return null;

    const serverUrl = userInfo.api_endpoints.auth;
    const serverUrlTemplate = serverUrl.replace(userInfo.username, '{user}');

    const credentials = {
      username: userInfo.username,
      apiKey: token.accessToken,
      serverUrlTemplate,
    };
    return credentials;
  }
);

/**
 * Set up initial OAuth state, loading values from localStorage if they were
 * stored in a previous session.
 */
function loadOAuthState(oauthInitialState) {
  let serializedState;
  try {
    const storedConfig = JSON.parse(localStorage.getItem('cra-carto'));
    const { token, userInfo } = storedConfig;

    if (token.expirationDate < Date.now()) {
      throw new Error('Found expired token in localStorage, resetting...');
    }
    serializedState = { token, userInfo };
  } catch (err) {
    serializedState = {};
  }

  const initialState = Object.assign(oauthInitialState, serializedState);
  return initialState;
}

/**
 * Persist partial OAuth state to localStorage, to allow recovering on
 * a new load
 */
function saveOAuthState(oauth) {
  try {
    const { token, userInfo } = oauth;

    if (token === null || userInfo === null) {
      localStorage.removeItem('cra-carto');
      return;
    }

    localStorage.setItem('cra-carto', JSON.stringify({ token, userInfo }));
  } catch {
    // ignore write errors
  }
}
