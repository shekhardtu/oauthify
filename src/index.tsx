// src/index.tsx

// import App from './App';
import OAuthifyRedirect from './app/OAuthifyRedirect/index.page';
import GithubIcon from './components/Icons/GithubIcon.svg';
import GoogleIcon from './components/Icons/GoogleIcon.svg';
import GitHubLoginButton from './components/SocialLogin/Github.component';
import GoogleLoginButton from './components/SocialLogin/Google.component';
import { OAuthifyProvider, useOAuthify } from './providers/OAuthify.provider';

export {
  GithubIcon,
  GitHubLoginButton,
  GoogleIcon,
  GoogleLoginButton,
  OAuthifyProvider,
  OAuthifyRedirect,
  useOAuthify
};

// Export all types
  export type {
    GitHubLoginButtonProps,
    GoogleLoginButtonProps, OAuthError, OAuthOptions, OAuthResponse, OAuthResult, SocialSignInResponse
  } from './types/oauthify';

