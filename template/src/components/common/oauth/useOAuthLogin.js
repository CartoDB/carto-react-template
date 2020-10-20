import { useState, useRef, useEffect } from 'react';
import { createOAuthPopup, getOAuthParamsFromCallback } from './oauthHelper';

/**
 * Hook to perform login against CARTO using OAuth implicit flow using a popup
 *
 * @param { clientId, scopes, authorizeEndPoint } oauthApp data
 * @returns [oauthParams, handleLogin]
 */
function useOAuthLogin(oauthApp) {
  const [oauthParams, setOAuthParams] = useState(null);
  const [popup, setPopup] = useState();
  const intervalRef = useRef();

  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  const handleLogin = () => {
    setPopup(createOAuthPopup(oauthApp));
  };

  // Based on github.com/kgoedecke/react-oauth-popup/blob/master/src/index.tsx
  useEffect(() => {
    if (popup) {
      intervalRef.current = window.setInterval(() => {
        try {
          const popupUrl = popup.location.href;
          const params = getOAuthParamsFromCallback(popupUrl);
          if (!params) {
            return;
          }

          setOAuthParams(params);

          clearTimer();
          popup.close(); // done, get rid of the popup
        } catch (popupError) {
          setOAuthParams({
            error: 'OAuth popup error',
            errorDescription: popupError.message,
          });
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

  return [oauthParams, handleLogin];
}

export default useOAuthLogin;
