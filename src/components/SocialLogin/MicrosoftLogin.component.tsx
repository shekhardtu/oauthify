import React from 'react';
import { OAUTH_PROVIDERS } from '../../config/oauth.providers.config';
import { MicrosoftOAuthConfig } from '../../types/providers.types';
import { OAuthError, OAuthResponse } from '../../types/oauthify.types';
import BaseOAuthButton from '../BaseOAuthButton/BaseOAuthButton.component';

/**
 * Microsoft OAuth Login Button Component
 *
 * @example
 * ```tsx
 * <MicrosoftLoginButton
 *   clientId="your-azure-app-id"
 *   redirectUri="http://localhost:3000/auth/callback"
 *   onSuccess={(response) => console.log('Success:', response)}
 *   onFailure={(error) => console.error('Error:', error)}
 *   tenant="common" // or your specific tenant ID
 * >
 *   Sign in with Microsoft
 * </MicrosoftLoginButton>
 * ```
 */
export interface MicrosoftLoginButtonProps {
  clientId: string;
  redirectUri: string;
  children?: React.ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  className?: string;
  disabled?: boolean;

  // Microsoft specific props
  tenant?: string; // Defaults to 'common'
  responseMode?: 'query' | 'fragment' | 'form_post';
  prompt?: 'login' | 'none' | 'consent' | 'select_account';
  loginHint?: string;
  domainHint?: string;
  scope?: string; // Override default scope
}

const MicrosoftLoginButton: React.FC<MicrosoftLoginButtonProps> = ({
  clientId,
  redirectUri,
  children,
  onSuccess,
  onFailure,
  className = 'oauth-microsoft-btn',
  disabled = false,
  tenant = 'common',
  responseMode,
  prompt,
  loginHint,
  domainHint,
  scope,
  ...rest
}) => {
  // Build Microsoft-specific configuration
  const microsoftConfig: MicrosoftOAuthConfig = {
    ...OAUTH_PROVIDERS.microsoft,
    authUrl: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
  } as MicrosoftOAuthConfig;

  // Build additional parameters
  const additionalParams: Record<string, string> = {};
  if (responseMode) additionalParams.response_mode = responseMode;
  if (prompt) additionalParams.prompt = prompt;
  if (loginHint) additionalParams.login_hint = loginHint;
  if (domainHint) additionalParams.domain_hint = domainHint;

  return (
    <BaseOAuthButton
      clientId={clientId}
      redirectUri={redirectUri}
      provider={microsoftConfig}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={className}
      disabled={disabled}
      ariaLabel="Sign in with Microsoft"
      scope={scope}
      additionalParams={additionalParams}
      {...rest}
    >
      {children || (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
            <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
            <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
          </svg>
          Sign in with Microsoft
        </span>
      )}
    </BaseOAuthButton>
  );
};

export default MicrosoftLoginButton;