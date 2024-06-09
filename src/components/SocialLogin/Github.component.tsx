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
  redirectUri: string;
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

  listenForOAuthResult((result) => {
    if (result?.code) {
      setOnSuccess?.(result);
      onSuccess?.(result);
    } else if (result.error) {
      setOnFailure?.(result.error);
      onFailure?.(result.error);
    }
  });

  const handleLoginClick = () => {
    console.count('handleLoginClick');
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
