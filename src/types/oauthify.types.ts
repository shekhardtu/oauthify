// OAuth Response Types
export interface OAuthResponse {
  code: string;
  provider: string;
  redirectUri?: string;
  state?: string;
  payload?: Record<string, unknown>;
}

// OAuth Configuration Types
export interface OAuthOptions {
  clientId: string;
  redirectUri: string;
  scope?: string;
  state?: string;
  provider?: string;
  responseType?: string;
  additionalParams?: Record<string, string>;
}

// OAuth Result Types
export interface OAuthResult {
  provider: string;
  code?: string;
  error?: string;
  error_description?: string;
  state?: string;
}

// OAuth Error Types
export interface OAuthError {
  error: string;
  error_description?: string;
  provider: string;
  state?: string;
}

// Social Sign In Response
export interface SocialSignInResponse {
  provider: string;
  code: string;
  redirectUri?: string;
  payload?: Record<string, unknown>;
}

// Component Props Types
export interface BaseOAuthButtonProps {
  clientId: string;
  redirectUri: string;
  children?: React.ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export interface GitHubLoginButtonProps extends BaseOAuthButtonProps {
  buttonType?: 'icon' | 'button';
  size?: 'small' | 'medium' | 'large';
}

export interface GoogleLoginButtonProps extends BaseOAuthButtonProps {
  variant?: 'singleTouch' | 'renderedView' | 'serverSide';
  buttonType?: 'icon' | 'button';
  size?: 'small' | 'medium' | 'large';
}

// Provider Configuration
export interface OAuthProviderConfig {
  name: string;
  authUrl: string;
  scope: string;
  clientIdKey?: string;
  redirectUriKey?: string;
  responseType?: string;
}

// State Management Types
export interface OAuthifyState {
  loading: boolean;
  success: OAuthResponse | null;
  error: OAuthError | null;
  activeProvider: string | null;
}

// Action Types for Reducer
export type OAuthifyAction =
  | { type: 'SET_LOADING'; payload: { loading: boolean; provider?: string } }
  | { type: 'SET_SUCCESS'; payload: OAuthResponse }
  | { type: 'SET_ERROR'; payload: OAuthError }
  | { type: 'CLEAR_STATE' }
  | { type: 'CLEAR_ERROR' };

// Message Types
export interface OAuthMessage {
  type: 'oauth_response';
  code?: string;
  error?: string;
  error_description?: string;
  provider: string;
  state?: string;
}