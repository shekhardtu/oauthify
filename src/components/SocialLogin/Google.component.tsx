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
  variant = 'serverSide',
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
      setOnFailure?.(result);
      onFailure?.(result);
    }
  });

  // useEffect(() => {
  //   if (variant === 'renderedView') {
  //     const loadGoogleScript = () => {
  //       const script = document.createElement('script');
  //       script.src = 'https://accounts.google.com/gsi/client';
  //       script.async = true;
  //       script.defer = true;
  //       script.onload = initializeGoogleLogin;
  //       document.body.appendChild(script);
  //     };

  //     const initializeGoogleLogin = () => {
  //       try {
  //         window.google.accounts.id.initialize({
  //           client_id: clientId,
  //           callback: handleCallbackResponse,
  //         });

  //         window.google.accounts.id.renderButton(
  //           document.getElementById('google-login-button')!,
  //           { theme: 'outline', size: size, type: buttonType },
  //         );

  //         window.google.accounts.id.prompt(); // Optional: to display One Tap
  //       } catch (error) {
  //         console.error('Error initializing Google Sign-In:', error);
  //       }
  //     };

  //     const handleCallbackResponse = (response: any) => {
  //       if (response.credential) {
  //         try {
  //           setOnSuccess?.(response);
  //           onSuccess?.(response);
  //         } catch (error) {
  //           console.error('Error decoding JWT:', error);
  //           setOnFailure?.('Error decoding JWT');
  //           onFailure?.(error);
  //         }
  //       } else {
  //         setOnFailure?.('No credential returned');
  //         onFailure?.('No credential returned');
  //       }
  //     };

  //     if (!window.google) {
  //       loadGoogleScript();
  //     } else {
  //       initializeGoogleLogin();
  //     }

  //     return () => {
  //       const script = document.querySelector(
  //         'script[src="https://accounts.google.com/gsi/client"]',
  //       );
  //       if (script) {
  //         script.remove();
  //       }
  //     };
  //   }
  // }, [
  //   onSuccess,
  //   onFailure,
  //   setOnSuccess,
  //   setOnFailure,
  //   variant,
  //   buttonType,
  //   size,
  // ]);

  const handleLoginClick = () => {
    if (variant === 'serverSide') {
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
    }
  };

  if (variant === 'renderedView') {
    return <div id="google-login-button">{children}</div>;
  }

  return <button onClick={handleLoginClick}>{children}</button>;
};

export default GoogleLoginButton;
