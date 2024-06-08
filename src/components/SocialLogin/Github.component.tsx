import React, { useEffect, useRef } from 'react';
import { useOAuthify } from 'src/providers/OAuthify.provider';
import {
  openOAuthWindow,
  buildAuthUrl,
  listenForOAuthResult,
} from 'src/OAuthify.core';

interface GitHubLoginButtonProps {
  clientId: string;
  children?: React.ReactNode;
  onSuccess?: (response: any) => void;
  onFailure?: (error: any) => void;
  buttonType?: 'icon' | 'button';
  size?: 'small' | 'medium' | 'large';
  redirectUri?: string;
}

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

  useEffect(() => {
    listenForOAuthResult((result) => {
      if (result.code) {
        setOnSuccess?.(result.code);
        onSuccess?.(result.code);
      } else if (result.error) {
        setOnFailure?.(result.error);
        onFailure?.(result.error);
      }
    });
  }, [onSuccess, onFailure, setOnSuccess, setOnFailure]);

  const handleLoginClick = () => {
    const authUrl = buildAuthUrl('https://github.com/login/oauth/authorize', {
      clientId: clientId,
      redirectUri: redirectUri || window.location.origin,
      scope: 'user:email',
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
