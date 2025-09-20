import React from 'react';
import { OAUTH_PROVIDERS } from '../../config/oauth.providers.config';
import { AppleOAuthConfig } from '../../types/providers.types';
import { OAuthError, OAuthResponse } from '../../types/oauthify.types';
import BaseOAuthButton from '../BaseOAuthButton/BaseOAuthButton.component';

/**
 * Apple Sign In Button Component
 *
 * @example
 * ```tsx
 * <AppleLoginButton
 *   clientId="your-apple-service-id"
 *   redirectUri="https://yourdomain.com/auth/callback"
 *   onSuccess={(response) => console.log('Success:', response)}
 *   onFailure={(error) => console.error('Error:', error)}
 *   responseMode="form_post" // Apple requires form_post for web
 * >
 *   Sign in with Apple
 * </AppleLoginButton>
 * ```
 */
export interface AppleLoginButtonProps {
  clientId: string;
  redirectUri: string;
  children?: React.ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  className?: string;
  disabled?: boolean;

  // Apple specific props
  responseMode?: 'query' | 'fragment' | 'form_post';
  usePopup?: boolean;
  scope?: string;
}

const AppleLoginButton: React.FC<AppleLoginButtonProps> = ({
  clientId,
  redirectUri,
  children,
  onSuccess,
  onFailure,
  className = 'oauth-apple-btn',
  disabled = false,
  responseMode = 'form_post',
  usePopup = true,
  scope,
  ...rest
}) => {
  const appleConfig: AppleOAuthConfig = {
    ...OAUTH_PROVIDERS.apple
  } as AppleOAuthConfig;

  const additionalParams: Record<string, string> = {
    response_mode: responseMode
  };
  if (usePopup) additionalParams.use_popup = 'true';

  return (
    <BaseOAuthButton
      clientId={clientId}
      redirectUri={redirectUri}
      provider={appleConfig}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={className}
      disabled={disabled}
      ariaLabel="Sign in with Apple"
      scope={scope}
      additionalParams={additionalParams}
      {...rest}
    >
      {children || (
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#000',
          fontWeight: 500
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.152 12.265c-.015-1.548.845-2.364 1.778-3.03-.653-.933-1.668-1.492-2.798-1.547-1.17-.117-2.423.703-2.887.703-.485 0-1.576-.673-2.413-.673-1.867.03-3.997 1.547-3.997 4.577 0 .918.168 1.866.504 2.844.423 1.23 1.95 4.243 3.545 4.198.825-.015 1.39-.598 2.398-.598.963 0 1.517.598 2.428.598 1.607-.03 2.958-2.683 3.352-3.913-2.197-.963-2.21-2.999-2.21-3.159zm-2.044-5.627c.84-.993.758-2.398.733-2.638-.748.06-1.607.508-2.106 1.108-.554.643-.918 1.502-.773 2.413.803.06 1.532-.388 2.146-.883z"
              fill="#000"
            />
          </svg>
          Sign in with Apple
        </span>
      )}
    </BaseOAuthButton>
  );
};

export default AppleLoginButton;