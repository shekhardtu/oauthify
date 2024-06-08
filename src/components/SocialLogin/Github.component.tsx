import React, { useEffect, useRef } from 'react';
import { useReactOAuth } from 'src/context/ReactOauth.context';

interface GitHubLoginButtonProps {
  children?: React.ReactNode;
  onSuccess?: (response: any) => void;
  onFailure?: (error: any) => void;
  buttonType?: 'icon' | 'button';
  size?: 'small' | 'medium' | 'large';
  redirectUri: string;
}

const GitHubLoginButton: React.FC<GitHubLoginButtonProps> = ({
  children,
  onSuccess,
  onFailure,
  buttonType = 'button',
  size = 'medium',
  redirectUri,
}) => {
  const { setOnFailure, setOnSuccess, githubClientId } = useReactOAuth();
  const authWindowRef = useRef<Window | null>(null);

  useEffect(() => {
    const handleCallbackResponse = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      const { code, error } = event.data;
      if (code) {
        try {
          setOnSuccess?.(code);
          onSuccess?.(code);
        } catch (err) {
          console.error('Error handling response:', err);
          setOnFailure?.(err);
          onFailure?.(err);
        }
      } else if (error) {
        setOnFailure?.(error);
        onFailure?.(error);
      }
    };

    window.addEventListener('message', handleCallbackResponse);

    return () => {
      window.removeEventListener('message', handleCallbackResponse);
    };
  }, [onSuccess, onFailure, setOnSuccess, setOnFailure]);

  const handleLoginClick = () => {
    const clientId = githubClientId;
    const state = Math.random().toString(36).substring(2); // Random state to prevent CSRF
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email&state=${state}`;
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    if (authWindowRef.current && !authWindowRef.current.closed) {
      authWindowRef.current.focus();
    } else {
      authWindowRef.current = window.open(
        authUrl,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top}`,
      );
    }
  };

  const renderButtonContent = () => {
    if (buttonType === 'icon') {
      return <img src="/path/to/github-icon.png" alt="GitHub Icon" />;
    }
    return children || 'Login with GitHub';
  };

  const buttonClass =
    size === 'small'
      ? 'small-button'
      : size === 'large'
        ? 'large-button'
        : 'medium-button';

  return (
    <button onClick={handleLoginClick} className={buttonClass}>
      {renderButtonContent()}
    </button>
  );
};

export default GitHubLoginButton;
