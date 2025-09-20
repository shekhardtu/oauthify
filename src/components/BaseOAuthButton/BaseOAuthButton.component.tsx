import React, { ReactNode } from 'react';
import { buildAuthUrl, openOAuthWindow } from '../../OAuthify.core';
import { useOAuthListener } from '../../hooks/useOAuthListener.hook';
import { useOAuthify } from '../../providers/OAuthify.provider';
import { OAuthProviderConfig } from '../../types/providers.types';
import { OAuthError, OAuthResponse, OAuthResult } from '../../types/oauthify.types';

export interface BaseOAuthButtonProps {
  clientId: string;
  redirectUri: string;
  provider: OAuthProviderConfig;
  children?: ReactNode;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  scope?: string; // Allow scope override
  additionalParams?: Record<string, string>; // Allow additional params override
}

const BaseOAuthButton: React.FC<BaseOAuthButtonProps> = ({
  clientId,
  redirectUri,
  provider,
  children,
  onSuccess,
  onFailure,
  className,
  disabled = false,
  ariaLabel,
  scope,
  additionalParams
}) => {
  const { setOnFailure, setOnSuccess } = useOAuthify();

  // Use the custom hook for OAuth message listening
  useOAuthListener({
    provider: provider.name,
    onSuccess: (result: OAuthResult) => {
      const response: OAuthResponse = {
        provider: provider.name,
        code: result.code!,
        redirectUri,
        state: result.state
      };
      setOnSuccess?.(response);
      onSuccess?.(response);
    },
    onError: (error: OAuthError) => {
      setOnFailure?.(error);
      onFailure?.(error);
    }
  });

  const handleClick = () => {
    if (disabled) return;

    const state = JSON.stringify({
      provider: provider.name,
      timestamp: Date.now(),
      state: Math.random().toString(36).substring(2),
    });

    const authUrl = buildAuthUrl(provider.authUrl, {
      clientId,
      redirectUri,
      scope: scope || provider.scope,
      responseType: provider.responseType,
      state,
      additionalParams: {
        ...provider.additionalParams,
        ...additionalParams
      }
    });

    // Use improved window management with provider key
    openOAuthWindow(authUrl, provider.name);
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel || `Sign in with ${provider.name}`}
      type="button"
    >
      {children}
    </button>
  );
};

export default BaseOAuthButton;