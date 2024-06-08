import React, { useEffect, useRef } from 'react';
import { useReactOAuth } from 'src/context/ReactOauth.context';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleLoginButtonProps {
  children?: React.ReactNode;
  onSuccess?: (response: any) => void;
  onFailure?: (error: any) => void;
  variant?: 'singleTouch' | 'renderedView' | 'serverSide';
  buttonType?: 'icon' | 'button';
  size?: 'small' | 'medium' | 'large';
  redirectUri?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  children,
  onSuccess,
  onFailure,
  variant = 'serverSide',
  buttonType = 'button',
  size = 'medium',
  redirectUri,
}) => {
  const { googleClientId, setOnFailure, setOnSuccess } = useReactOAuth();
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

  useEffect(() => {
    if (variant === 'renderedView') {
      const loadGoogleScript = () => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleLogin;
        document.body.appendChild(script);
      };

      const initializeGoogleLogin = () => {
        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleCallbackResponse,
          });

          window.google.accounts.id.renderButton(
            document.getElementById('google-login-button')!,
            { theme: 'outline', size: size, type: buttonType },
          );

          window.google.accounts.id.prompt(); // Optional: to display One Tap
        } catch (error) {
          console.error('Error initializing Google Sign-In:', error);
        }
      };

      const handleCallbackResponse = (response: any) => {
        if (response.credential) {
          try {
            setOnSuccess?.(response);
            onSuccess?.(response);
          } catch (error) {
            console.error('Error decoding JWT:', error);
            setOnFailure?.('Error decoding JWT');
            onFailure?.(error);
          }
        } else {
          setOnFailure?.('No credential returned');
          onFailure?.('No credential returned');
        }
      };

      if (!window.google) {
        loadGoogleScript();
      } else {
        initializeGoogleLogin();
      }

      return () => {
        const script = document.querySelector(
          'script[src="https://accounts.google.com/gsi/client"]',
        );
        if (script) {
          script.remove();
        }
      };
    }
  }, [
    googleClientId,
    onSuccess,
    onFailure,
    setOnSuccess,
    setOnFailure,
    variant,
    buttonType,
    size,
  ]);

  const handleLoginClick = () => {
    console.log(redirectUri);
    if (variant === 'serverSide') {
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile email`;
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
    }
  };

  if (variant === 'renderedView') {
    return <div id="google-login-button">{children}</div>;
  }

  return <button onClick={handleLoginClick}>{children}</button>;
};

export default GoogleLoginButton;
