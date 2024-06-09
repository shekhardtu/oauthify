import React, { useEffect, useRef } from 'react';
import { useOAuthify } from 'src/providers/OAuthify.provider';
import {
  openOAuthWindow,
  buildAuthUrl,
  listenForOAuthResult,
} from 'src/OAuthify.core';
declare global {
  interface Window {
    google: any;
  }
}
interface GoogleLoginButtonProps {
  clientId: string;
  children?: React.ReactNode;
  onSuccess?: (response: any) => void;
  onFailure?: (error: any) => void;
  variant?: 'singleTouch' | 'renderedView' | 'serverSide';
  buttonType?: 'icon' | 'button';
  size?: 'small' | 'medium' | 'large';
  redirectUri: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  clientId,
  children,
  onSuccess,
  onFailure,
  redirectUri,
}) => {
  const { setOnFailure, setOnSuccess } = useOAuthify();
  const authWindowRef = useRef<Window | null>(null);

  useEffect(() => {
    listenForOAuthResult((result) => {
      if (result?.code) {
        setOnSuccess?.(result);
        onSuccess?.(result);
      } else if (result.error) {
        setOnFailure?.(result);
        onFailure?.(result);
      }
    });
  }, []);

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
