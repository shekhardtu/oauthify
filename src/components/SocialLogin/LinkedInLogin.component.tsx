import React from 'react';
import { OAUTH_PROVIDERS } from '../../config/oauth.providers.config';
import { LinkedInOAuthConfig } from '../../types/providers.types';
import { OAuthError, OAuthResponse } from '../../types/oauthify.types';
import BaseOAuthButton from '../BaseOAuthButton/BaseOAuthButton.component';

/**
 * LinkedIn OAuth Login Button Component
 *
 * @example
 * ```tsx
 * <LinkedInLoginButton
 *   clientId="your-linkedin-client-id"
 *   redirectUri="http://localhost:3000/auth/callback"
 *   onSuccess={(response) => console.log('Success:', response)}
 *   onFailure={(error) => console.error('Error:', error)}
 * >
 *   Sign in with LinkedIn
 * </LinkedInLoginButton>
 * ```
 */
export interface LinkedInLoginButtonProps {
  clientId: string;
  redirectUri: string;
  children?: React.ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  className?: string;
  disabled?: boolean;
  scope?: string; // Override default scope
}

const LinkedInLoginButton: React.FC<LinkedInLoginButtonProps> = ({
  clientId,
  redirectUri,
  children,
  onSuccess,
  onFailure,
  className = 'oauth-linkedin-btn',
  disabled = false,
  scope,
  ...rest
}) => {
  // Use LinkedIn configuration
  const linkedinConfig: LinkedInOAuthConfig = {
    ...OAUTH_PROVIDERS.linkedin
  } as LinkedInOAuthConfig;

  return (
    <BaseOAuthButton
      clientId={clientId}
      redirectUri={redirectUri}
      provider={linkedinConfig}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={className}
      disabled={disabled}
      ariaLabel="Sign in with LinkedIn"
      scope={scope}
      {...rest}
    >
      {children || (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              fill="#0A66C2"
            />
          </svg>
          Sign in with LinkedIn
        </span>
      )}
    </BaseOAuthButton>
  );
};

export default LinkedInLoginButton;