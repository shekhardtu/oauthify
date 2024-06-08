import React, { useEffect } from 'react';
import { useReactOAuth } from 'src/context/ReactOauth.context';

declare global {
    interface Window {
        github: any;
    }
}

interface GitHubLoginButtonProps {
    children?: React.ReactNode;
    onSuccess?: (response: any) => void;
    onFailure?: (error: any) => void;

    redirectUri: string;
    scope?: string;
}

const GitHubLoginButton: React.FC<GitHubLoginButtonProps> = ({
    children,
    onSuccess,
    onFailure,
    redirectUri,
    scope = 'read:user'
}) => {
    const { setOnFailure, setOnSuccess, githubClientId } = useReactOAuth();

    useEffect(() => {
        const handleCallbackResponse = (response: any) => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const error = urlParams.get('error');

            if (code) {
                try {
                    setOnSuccess?.({ code });
                    onSuccess?.({ code });
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

        // Check for GitHub OAuth redirect
        if (window.location.search.includes('code=')) {
            handleCallbackResponse(window.location.search);
        }

        return () => {
            // Clean up if necessary
        };
    }, [onSuccess, onFailure, setOnSuccess, setOnFailure]);

    const handleLogin = () => {
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
        window.location.href = githubAuthUrl;
    };

    return (
        <div className='flex flex-row justify-center items-center h-20'>
            <div onClick={handleLogin}>
                {children}
            </div>
        </div>
    );
};

export default GitHubLoginButton;
