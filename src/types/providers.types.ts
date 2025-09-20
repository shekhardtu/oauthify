/**
 * Provider-specific type definitions for OAuth authentication
 */

/**
 * Base configuration that all OAuth providers share
 */
export interface BaseProviderConfig {
  name: string;
  authUrl: string;
  scope: string;
  clientIdKey?: string;
  redirectUriKey?: string;
  responseType?: string;
  additionalParams?: Record<string, string>;
}

/**
 * Google OAuth specific configuration
 * @see https://developers.google.com/identity/protocols/oauth2
 */
export interface GoogleOAuthConfig extends BaseProviderConfig {
  name: 'google';
  accessType?: 'online' | 'offline';
  prompt?: 'none' | 'consent' | 'select_account';
  includeGrantedScopes?: boolean;
  loginHint?: string;
  hostedDomain?: string;
}

/**
 * GitHub OAuth specific configuration
 * @see https://docs.github.com/en/apps/oauth-apps
 */
export interface GitHubOAuthConfig extends BaseProviderConfig {
  name: 'github';
  allowSignup?: boolean;
  login?: string;
}

/**
 * Microsoft OAuth specific configuration
 * @see https://docs.microsoft.com/en-us/azure/active-directory/develop/
 */
export interface MicrosoftOAuthConfig extends BaseProviderConfig {
  name: 'microsoft';
  tenant?: string;
  responseMode?: 'query' | 'fragment' | 'form_post';
  prompt?: 'login' | 'none' | 'consent' | 'select_account';
  loginHint?: string;
  domainHint?: string;
  codeChallenge?: string;
  codeChallengeMethod?: string;
}

/**
 * Facebook OAuth specific configuration
 * @see https://developers.facebook.com/docs/facebook-login/
 */
export interface FacebookOAuthConfig extends BaseProviderConfig {
  name: 'facebook';
  display?: 'page' | 'popup' | 'touch' | 'wap';
  authType?: 'rerequest' | 'reauthenticate' | 'reauthorize';
  returnScopes?: boolean;
}

/**
 * LinkedIn OAuth specific configuration
 * @see https://docs.microsoft.com/en-us/linkedin/shared/authentication/
 */
export interface LinkedInOAuthConfig extends BaseProviderConfig {
  name: 'linkedin';
}

/**
 * Apple OAuth specific configuration
 * @see https://developer.apple.com/documentation/sign_in_with_apple
 */
export interface AppleOAuthConfig extends BaseProviderConfig {
  name: 'apple';
  responseMode?: 'query' | 'fragment' | 'form_post';
  usePopup?: boolean;
}

/**
 * Twitter/X OAuth specific configuration
 * @see https://developer.twitter.com/en/docs/authentication/oauth-2-0
 */
export interface TwitterOAuthConfig extends BaseProviderConfig {
  name: 'twitter';
  codeChallenge?: string;
  codeChallengeMethod?: 'S256' | 'plain';
}

/**
 * Discord OAuth specific configuration
 * @see https://discord.com/developers/docs/topics/oauth2
 */
export interface DiscordOAuthConfig extends BaseProviderConfig {
  name: 'discord';
  permissions?: number;
  guildId?: string;
  disableGuildSelect?: boolean;
  prompt?: 'consent' | 'none';
}

/**
 * Spotify OAuth specific configuration
 * @see https://developer.spotify.com/documentation/general/guides/authorization-guide/
 */
export interface SpotifyOAuthConfig extends BaseProviderConfig {
  name: 'spotify';
  showDialog?: boolean;
}

/**
 * Slack OAuth specific configuration
 * @see https://api.slack.com/docs/oauth
 */
export interface SlackOAuthConfig extends BaseProviderConfig {
  name: 'slack';
  team?: string;
  userScope?: string;
}

/**
 * Union type of all provider configurations
 */
export type OAuthProviderConfig =
  | GoogleOAuthConfig
  | GitHubOAuthConfig
  | MicrosoftOAuthConfig
  | FacebookOAuthConfig
  | LinkedInOAuthConfig
  | AppleOAuthConfig
  | TwitterOAuthConfig
  | DiscordOAuthConfig
  | SpotifyOAuthConfig
  | SlackOAuthConfig
  | BaseProviderConfig;

/**
 * Provider names as a union type for better type safety
 */
export type OAuthProviderName = OAuthProviderConfig['name'];

/**
 * Provider-specific button props with full type safety
 */
export interface ProviderButtonProps<T extends OAuthProviderConfig = BaseProviderConfig> {
  clientId: string;
  redirectUri: string;
  children?: React.ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  providerConfig?: Partial<T>;
}

/**
 * OAuth response with provider information
 */
export interface OAuthResponse {
  provider: OAuthProviderName;
  code: string;
  state?: string;
  redirectUri?: string;
  [key: string]: unknown;
}

/**
 * OAuth error with provider information
 */
export interface OAuthError {
  provider: OAuthProviderName;
  error: string;
  error_description?: string;
  state?: string;
}