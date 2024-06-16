import React, { useEffect, useRef } from 'react';
import {
  buildAuthUrl,
  listenForOAuthResult,
  openOAuthWindow,
} from 'src/OAuthify.core';
import { useOAuthify } from 'src/providers/OAuthify.provider';
import { GitHubLoginButtonProps, OAuthError, OAuthResult } from 'src/types/oauthify';



const GitHubLoginButton: React.FC<GitHubLoginButtonProps> = ({
  clientId,
  children,
  onSuccess,
  onFailure,
  buttonType = 'button',
  size = 'medium',
  redirectUri,
}) => {
  const { setOnFailure, setOnSuccess } = useOAuthify();
  const authWindowRef = useRef<Window | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!cleanupRef.current) {
      cleanupRef.current = listenForOAuthResult((result: OAuthResult | OAuthError) => {
        if ('code' in result) {
          const response = {
            ...result,
            provider: result.provider,
            code: result.code
          };
          setOnSuccess?.(response);
          onSuccess?.(response);
        } else {
          const error = result as OAuthError;
          setOnFailure?.(error);
          onFailure?.(error);
        }
      });
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [onSuccess, onFailure, setOnSuccess, setOnFailure]);

  const handleLoginClick = () => {
    const authUrl = buildAuthUrl('https://github.com/login/oauth/authorize', {
      clientId: clientId,
      redirectUri: redirectUri,
      scope: 'user:email',
      state: JSON.stringify({
        provider: 'github',
        state: Math.random().toString(36).substring(2),
      }),
    });

    if (authWindowRef.current && !authWindowRef.current.closed) {
      authWindowRef.current.focus();
    } else {
      authWindowRef.current = openOAuthWindow(authUrl);
    }
  };

  return <button onClick={handleLoginClick}>{children}</button>;
};

export default GitHubLoginButton;
