import React, { useEffect, useRef } from 'react';
import {
  buildAuthUrl,
  listenForOAuthResult,
  openOAuthWindow,
} from 'src/OAuthify.core';
import { useOAuthify } from 'src/providers/OAuthify.provider';
import { GoogleLoginButtonProps, OAuthError } from 'src/types/oauthify';
declare global {
  interface Window {
    google: any;
  }
}




const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  clientId,
  children,
  onSuccess,
  onFailure,
  redirectUri,
  buttonType = 'button',
  size = 'medium',
}) => {
  const { setOnFailure, setOnSuccess } = useOAuthify();
  const authWindowRef = useRef<Window | null>(null);

  useEffect(() => {
    const cleanup = listenForOAuthResult((result) => {
      if (result?.code && result.provider) {
        const response = {
          ...result,
          provider: result.provider,
          code: result.code
        };
        setOnSuccess?.(response);
        onSuccess?.(response);
      } else if (result.error) {
        const error: OAuthError = {
          ...result,
          error: result.error,
        };
        setOnFailure?.(error);
        onFailure?.(error);
      }
    });

    return () => {
      cleanup?.();
    };
  }, [onSuccess, onFailure, setOnSuccess, setOnFailure]);

  const handleLoginClick = () => {
    const authUrl = buildAuthUrl(
      'https://accounts.google.com/o/oauth2/v2/auth',
      {
        clientId: clientId,
        redirectUri: redirectUri,
        scope: 'profile email',
        state: JSON.stringify({
          provider: 'google',
          state: Math.random().toString(36).substring(2),
        }),
      },
    );

    if (authWindowRef.current && !authWindowRef.current.closed) {
      authWindowRef.current.focus();
    } else {
      authWindowRef.current = openOAuthWindow(authUrl);
    }
  };

  return <button onClick={handleLoginClick}>{children}</button>;
};

export default GoogleLoginButton;
