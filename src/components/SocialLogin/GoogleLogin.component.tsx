import React from 'react';
import { OAUTH_PROVIDERS } from '../../config/oauth.providers.config';
import { GoogleLoginButtonProps } from '../../types/oauthify.types';
import BaseOAuthButton from '../BaseOAuthButton/BaseOAuthButton.component';

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  clientId,
  children,
  onSuccess,
  onFailure,
  redirectUri,
  buttonType = 'button',
  size = 'medium',
  ...rest
}) => {
  // Generate className based on size and type
  const className = `oauth-google-btn oauth-btn-${buttonType} oauth-btn-${size}`;

  return (
    <BaseOAuthButton
      clientId={clientId}
      redirectUri={redirectUri}
      provider={OAUTH_PROVIDERS.google}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={className}
      ariaLabel="Sign in with Google"
      {...rest}
    >
      {children || 'Sign in with Google'}
    </BaseOAuthButton>
  );
};

export default GoogleLoginButton;