import React from 'react';
import { OAUTH_PROVIDERS } from '../../config/oauth.providers.config';
import { GitHubLoginButtonProps } from '../../types/oauthify.types';
import BaseOAuthButton from '../BaseOAuthButton/BaseOAuthButton.component';

const GitHubLoginButton: React.FC<GitHubLoginButtonProps> = ({
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
  const className = `oauth-github-btn oauth-btn-${buttonType} oauth-btn-${size}`;

  return (
    <BaseOAuthButton
      clientId={clientId}
      redirectUri={redirectUri}
      provider={OAUTH_PROVIDERS.github}
      onSuccess={onSuccess}
      onFailure={onFailure}
      className={className}
      ariaLabel="Sign in with GitHub"
      {...rest}
    >
      {children || 'Sign in with GitHub'}
    </BaseOAuthButton>
  );
};

export default GitHubLoginButton;