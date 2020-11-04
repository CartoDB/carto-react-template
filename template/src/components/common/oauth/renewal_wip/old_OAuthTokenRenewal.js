import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setError, setTokenAndUserInfoAsync } from 'config/oauthSlice';
import { buildTokenRenewalUrl, getOAuthParamsFromCallback } from '../oauthHelper';

const MAX_ATTEMPTS = 20;

/**
 * Component to perform a silent OAuth token renewal
 */
function OAuthTokenRenewal() {
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const token = useSelector((state) => state.oauth.token);

  const dispatch = useDispatch();

  const [isRenewing, setIsRenewing] = useState(false);
  const [tokenWillExpireSoon, setTokenWillExpireSoon] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const intervalRef = useRef();
  const iframeRef = useRef();

  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  const tokenCheck = () => {
    let now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    const IN_FIVE_MINUTES = new Date(now);
    // const willExpireSoon = token && new Date(token.expirationDate) < IN_FIVE_MINUTES;
    const willExpireSoon = Boolean(token);
    setTokenWillExpireSoon(willExpireSoon);
  };

  const programNextTokenCheck = () => {
    const ONE_MINUTE = 60000;
    intervalRef.current = setInterval(tokenCheck, ONE_MINUTE);
  };

  const silentRenewal = () => {
    return new Promise((resolve, reject) => {
      const checkRedirect = () => {
        const redirectUrl = iframeRef.current.contentWindow.location.href;
        if (!redirectUrl) {
          setCurrentAttempt((currentAttempt) => currentAttempt + 1);
          if (currentAttempt > MAX_ATTEMPTS) {
            reject({
              error: 'OAuth token renewal failed',
              error_description: 'Silent renewal failed after maximum number of attempts',
            });
            return;
          }
          setTimeout(() => checkRedirect(), 500);
          return;
        }

        // Silent renewal worked as expected, let's update the oauth info
        const params = getOAuthParamsFromCallback(redirectUrl);
        resolve(params);
      };

      checkRedirect();
    });
  };

  const handleOnLoad = () => {
    silentRenewal()
      .then((params) => {
        // save params
        if (params.error) {
          dispatch(setError(params));
        } else {
          dispatch(setTokenAndUserInfoAsync(params));
        }

        // clean up
        setIsRenewing(false);
        setCurrentAttempt(0);
        programNextTokenCheck();
        // Access token was renewed silently.
      })
      .catch((renewalError) => {
        dispatch(
          setError({
            error: 'OAuth token renewal error',
            errorDescription: renewalError,
          })
        );

        setIsRenewing(false);
      });
  };

  useEffect(() => {
    const THIRTY_SECONDS = 10000;
    intervalRef.current = setInterval(tokenCheck, THIRTY_SECONDS);

    return clearTimer;
  });

  useEffect(() => {
    if (tokenWillExpireSoon && !isRenewing) {
      setIsRenewing(true);
      clearTimer();
    }
  }, [tokenWillExpireSoon, isRenewing]);

  const renewalUrl = buildTokenRenewalUrl(oauthApp);
  return isRenewing ? (
    <iframe
      ref={iframeRef}
      style={{
        width: 0,
        height: 0,
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'none',
        visibility: 'hidden',
      }}
      width={0}
      height={0}
      title='silent-token-renew'
      src={renewalUrl}
      onLoad={handleOnLoad}
    ></iframe>
  ) : null;
}

export default OAuthTokenRenewal;
