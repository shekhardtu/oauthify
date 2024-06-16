
export interface OAuthResponse {
  code: string;
  provider: string;
  redirectUri?: string;
  payload?: any;
  [key: string]: any;
}


export interface OAuthOptions {
  clientId: string;
  redirectUri: string;
  scope?: string;
  state?: string;
  provider?: string;
  [key: string]: any;
}

export interface OAuthResult {
  provider?: string;
  code?: string;
  error?: string;
  [key: string]: any;
}

export interface OAuthError {
  error: string;
  [key: string]: any;
}

export interface SocialSignInResponse {
  provider: string;
  code: string;
  redirectUri?: string;
  payload?: any;
  [key: string]: any;
}

export interface GitHubLoginButtonProps {
  clientId: string;
  children?: React.ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  buttonType?: 'icon' | 'button';
  size?: 'small' | 'medium' | 'large';
  redirectUri: string;
  [key: string]: any;
}

export interface GoogleLoginButtonProps {
  clientId: string;
  children?: React.ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  variant?: 'singleTouch' | 'renderedView' | 'serverSide';
  buttonType?: 'icon' | 'button';
  size?: 'small' | 'medium' | 'large';
  redirectUri: string;
  [key: string]: any;
}