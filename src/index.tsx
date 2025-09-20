/**
 * OAuthify - A comprehensive OAuth authentication library for React
 *
 * @packageDocumentation
 */

// Core exports
export { buildAuthUrl, handleOAuthCallback, listenForOAuthResult, openOAuthWindow } from './OAuthify.core';

// Components - OAuth Login Buttons
export { default as BaseOAuthButton } from './components/BaseOAuthButton/BaseOAuthButton.component';
export { default as GoogleLoginButton } from './components/SocialLogin/GoogleLogin.component';
export { default as GitHubLoginButton } from './components/SocialLogin/GithubLogin.component';
export { default as MicrosoftLoginButton } from './components/SocialLogin/MicrosoftLogin.component';
export { default as FacebookLoginButton } from './components/SocialLogin/FacebookLogin.component';
export { default as LinkedInLoginButton } from './components/SocialLogin/LinkedInLogin.component';
export { default as AppleLoginButton } from './components/SocialLogin/AppleLogin.component';

// Redirect handler
export { default as OAuthifyRedirect } from './app/OAuthifyRedirect/index.page';

// Icons
export { default as GithubIcon } from './components/Icons/GithubIcon.svg';
export { default as GoogleIcon } from './components/Icons/GoogleIcon.svg';

// Providers and Hooks
export {
  OAuthifyProvider,
  useOAuthify,
  useOAuthifyError,
  useOAuthifyLoading,
  useOAuthifySuccess,
  type OAuthifyProviderProps
} from './providers/OAuthify.provider';
export { useOAuthListener } from './hooks/useOAuthListener.hook';

// Configuration
export {
  OAUTH_PROVIDERS,
  getProviderConfig,
  mergeProviderConfig
} from './config/oauth.providers.config';

// Core Types
export type {
  BaseOAuthButtonProps,
  GitHubLoginButtonProps,
  GoogleLoginButtonProps,
  OAuthError,
  OAuthifyAction,
  OAuthifyState,
  OAuthMessage,
  OAuthOptions,
  OAuthProviderConfig,
  OAuthResponse,
  OAuthResult,
  SocialSignInResponse
} from './types/oauthify.types';

// Provider-specific Types
export type {
  BaseProviderConfig,
  GoogleOAuthConfig,
  GitHubOAuthConfig,
  MicrosoftOAuthConfig,
  FacebookOAuthConfig,
  LinkedInOAuthConfig,
  AppleOAuthConfig,
  TwitterOAuthConfig,
  DiscordOAuthConfig,
  SpotifyOAuthConfig,
  SlackOAuthConfig,
  OAuthProviderName,
  ProviderButtonProps
} from './types/providers.types';

// Component Props Types
export type { MicrosoftLoginButtonProps } from './components/SocialLogin/MicrosoftLogin.component';
export type { FacebookLoginButtonProps } from './components/SocialLogin/FacebookLogin.component';
export type { LinkedInLoginButtonProps } from './components/SocialLogin/LinkedInLogin.component';
export type { AppleLoginButtonProps } from './components/SocialLogin/AppleLogin.component';

// For backward compatibility
export { default as GithubLoginButton } from './components/SocialLogin/GithubLogin.component';