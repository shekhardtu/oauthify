import {
  AppleOAuthConfig,
  DiscordOAuthConfig,
  FacebookOAuthConfig,
  GitHubOAuthConfig,
  GoogleOAuthConfig,
  LinkedInOAuthConfig,
  MicrosoftOAuthConfig,
  OAuthProviderConfig,
  SlackOAuthConfig,
  SpotifyOAuthConfig,
  TwitterOAuthConfig
} from '../types/providers.types';

/**
 * Pre-configured OAuth providers with sensible defaults
 * Users can override these settings when initializing components
 */
export const OAUTH_PROVIDERS: Record<string, OAuthProviderConfig> = {
  google: {
    name: 'google',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'openid profile email',
    responseType: 'code',
    additionalParams: {
      access_type: 'online',
      prompt: 'select_account'
    }
  } as GoogleOAuthConfig,

  github: {
    name: 'github',
    authUrl: 'https://github.com/login/oauth/authorize',
    scope: 'user:email',
    additionalParams: {
      allow_signup: 'true'
    }
  } as GitHubOAuthConfig,

  microsoft: {
    name: 'microsoft',
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    scope: 'openid profile email User.Read',
    responseType: 'code',
    additionalParams: {
      response_mode: 'query',
      prompt: 'select_account'
    }
  } as MicrosoftOAuthConfig,

  facebook: {
    name: 'facebook',
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scope: 'public_profile email',
    responseType: 'code',
    additionalParams: {
      display: 'popup',
      return_scopes: 'true'
    }
  } as FacebookOAuthConfig,

  linkedin: {
    name: 'linkedin',
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    scope: 'openid profile email',
    responseType: 'code'
  } as LinkedInOAuthConfig,

  apple: {
    name: 'apple',
    authUrl: 'https://appleid.apple.com/auth/authorize',
    scope: 'name email',
    responseType: 'code',
    additionalParams: {
      response_mode: 'form_post'
    }
  } as AppleOAuthConfig,

  twitter: {
    name: 'twitter',
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    scope: 'tweet.read users.read offline.access',
    responseType: 'code',
    additionalParams: {
      code_challenge_method: 'S256'
    }
  } as TwitterOAuthConfig,

  discord: {
    name: 'discord',
    authUrl: 'https://discord.com/api/oauth2/authorize',
    scope: 'identify email',
    responseType: 'code',
    additionalParams: {
      prompt: 'consent'
    }
  } as DiscordOAuthConfig,

  spotify: {
    name: 'spotify',
    authUrl: 'https://accounts.spotify.com/authorize',
    scope: 'user-read-email user-read-private',
    responseType: 'code',
    additionalParams: {
      show_dialog: 'true'
    }
  } as SpotifyOAuthConfig,

  slack: {
    name: 'slack',
    authUrl: 'https://slack.com/oauth/v2/authorize',
    scope: 'openid profile email',
    responseType: 'code'
  } as SlackOAuthConfig
};

/**
 * Helper function to get a provider configuration with type safety
 */
export function getProviderConfig<T extends OAuthProviderConfig>(
  providerName: T['name']
): T | undefined {
  return OAUTH_PROVIDERS[providerName] as T;
}

/**
 * Helper to merge user config with default provider config
 */
export function mergeProviderConfig<T extends OAuthProviderConfig>(
  providerName: T['name'],
  userConfig?: Partial<T>
): T {
  const defaultConfig = OAUTH_PROVIDERS[providerName] as T;
  if (!defaultConfig) {
    throw new Error(`Unknown OAuth provider: ${providerName}`);
  }

  return {
    ...defaultConfig,
    ...userConfig,
    additionalParams: {
      ...defaultConfig.additionalParams,
      ...userConfig?.additionalParams
    }
  } as T;
}