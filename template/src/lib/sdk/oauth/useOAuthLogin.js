import { useState, useRef, useEffect } from 'react';
import { createOAuthPopup, getOAuthParamsFromCallback } from './oauthHelper';

/**
 * Hook to perform login against CARTO using OAuth implicit flow using a popup
 *
 * @param { clientId, scopes, authorizeEndPoint } oauthApp data
 * @returns [handleLogin] - function to trigger oauth with a popup
 */
export default function useOAuthLogin(oauthApp, onParamsRefreshed) {
  const [oauthParams, setOAuthParams] = useState(null);
  const [emittedResponse, setEmittedResponse] = useState(false);
  const [popup, setPopup] = useState();
  const intervalRef = useRef();

  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  const handleLogin = () => {
    setOAuthParams(null); // a second call might happen, to get a token refresh
    setEmittedResponse(false);
    setPopup(createOAuthPopup(oauthApp));
  };

  // Based on github.com/kgoedecke/react-oauth-popup/blob/master/src/index.tsx
  useEffect(() => {
    if (popup && !oauthParams) {
      intervalRef.current = window.setInterval(() => {
        try {
          const popupUrl = popup.location.href;
          const params = getOAuthParamsFromCallback(popupUrl);
          if (!params) {
            return;
          }

          // done, so get rid of the popup
          setOAuthParams(params);

          clearTimer();
          popup.close();
        } catch (popupError) {
          // eslint-ignore-line
        } finally {
          if (!popup || popup.closed) {
            clearTimer();
          }
        }
      }, 500);
    }
    return () => {
      if (popup) popup.close();
      clearTimer();
    };
  });

  useEffect(() => {
    if (oauthParams && !emittedResponse) {
      onParamsRefreshed(oauthParams);
      setEmittedResponse(true);
    }
  }, [oauthParams, onParamsRefreshed, emittedResponse]);

  return [handleLogin];
}
