import React, { useEffect } from 'react';
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
    theme?: "outline" | "filled" | "standard";
    size?: "large" | "medium" | "small" | "standard";
    variant?: "icon" | "standard";
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
    children,
    onSuccess,
    onFailure,
    theme = 'outline',
    size = 'large',
    variant = 'icon'
}) => {
    const { googleClientId, setOnFailure, setOnSuccess } = useReactOAuth();

    useEffect(() => {
        if (!googleClientId) {
            console.error('Google Client ID is required for Google Login');
            return;
        }

        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleLogin;
            document.body.appendChild(script);
        };

        const initializeGoogleLogin = () => {
            const buttonDiv = document.getElementById("google-login-button");
            if (!buttonDiv) {
                console.error("Parent element for Google Sign-In button not found");
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    client_id: googleClientId,
                    callback: handleCallbackResponse,
                });

                window.google.accounts.id.renderButton(
                    buttonDiv,
                    {
                        theme: theme,
                        size: size,
                        type: variant,
                    }
                );

                // Ensure handleCallbackResponse is a function
                if (typeof handleCallbackResponse !== 'function') {
                    throw new Error('handleCallbackResponse is not a function');
                }

                window.google.accounts.id.prompt(

                ); // Optional: to display One Tap
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
            const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (script) {
                script.remove();
            }
        }
    }, [googleClientId]);

    return (
        <div className='flex flex-row justify-center items-center h-20'>
            <div id="google-login-button">
                {children}
            </div>
        </div>
    );
};

export default GoogleLoginButton;
