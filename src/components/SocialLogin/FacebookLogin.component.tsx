import React from 'react';
import { OAUTH_PROVIDERS } from '../../config/oauth.providers.config';
import { FacebookOAuthConfig } from '../../types/providers.types';
import { OAuthError, OAuthResponse } from '../../types/oauthify.types';
import BaseOAuthButton from '../BaseOAuthButton/BaseOAuthButton.component';

/**
 * Facebook OAuth Login Button Component
 *
 * @example
 * ```tsx
 * <FacebookLoginButton
 *   clientId="your-facebook-app-id"
 *   redirectUri="http://localhost:3000/auth/callback"
 *   onSuccess={(response) => console.log('Success:', response)}
 *   onFailure={(error) => console.error('Error:', error)}
 * >
 *   Continue with Facebook
 * </FacebookLoginButton>
 * ```
 */
export interface FacebookLoginButtonProps {
  clientId: string;
  redirectUri: string;
  children?: React.ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  className?: string;
  disabled?: boolean;

  // Facebook specific props
  display?: 'page' | 'popup' | 'touch' | 'wap';
  authType?: 'rerequest' | 'reauthenticate' | 'reauthorize';
  returnScopes?: boolean;
  scope?: string; // Override default scope
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  clientId,
  redirectUri,
  children,
  onSuccess,
  onFailure,
  className = 'oauth-facebook-btn',
  disabled = false,
  display,
  authType,
  returnScopes = true,
  scope,
  ...rest
}) => {
  // Build Facebook-specific configuration
  const facebookConfig: FacebookOAuthConfig = {
    ...OAUTH_PROVIDERS.facebook
  } as FacebookOAuthConfig;

  // Build additional parameters
  const additionalParams: Record<string, string> = {};
  if (display) additionalParams.display = display;
  if (authType) additionalParams.auth_type = authType;
  if (returnScopes !== undefined) additionalParams.return_scopes = String(returnScopes);

  return (
    <BaseOAuthButton
      clientId={clientId}
      redirectUri={redirectUri}
      provider={facebookConfig}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={className}
      disabled={disabled}
      ariaLabel="Continue with Facebook"
      scope={scope}
      additionalParams={additionalParams}
      {...rest}
    >
      {children || (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              fill="#1877F2"
            />
          </svg>
          Continue with Facebook
        </span>
      )}
    </BaseOAuthButton>
  );
};

export default FacebookLoginButton;