import React, { createContext, ReactNode, useContext, useState } from 'react';
import { OAuthError } from 'src/types/oauthify';
interface SocialSignInResponse {
  provider: string;
  code: string;
  redirectUri?: string;
  payload?: any;
}

interface OAuthifyContextProps<TSuccess = SocialSignInResponse, TError = OAuthError> {
  children?: ReactNode;
  setOnSuccess?: (response: TSuccess) => void;
  setOnFailure?: (error: TError) => void;
  onSuccess?: TSuccess;
  onFailure?: TError;
  setLoading?: (loading: boolean) => void;
  loading?: boolean;
}

const OAuthifyContext = createContext<OAuthifyContextProps | undefined>(
  undefined,
);

export const OAuthifyProvider: React.FC<OAuthifyContextProps> = ({
  children,
}) => {
  const [onSuccess, setOnSuccess] = useState<SocialSignInResponse>();
  const [onFailure, setOnFailure] = useState<OAuthError>();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <OAuthifyContext.Provider
      value={{
        setOnSuccess,
        setOnFailure,
        onSuccess,
        onFailure,
        setLoading,
        loading,
      }}
    >
      {children}
    </OAuthifyContext.Provider>
  );
};

export const useOAuthify = () => {
  const context = useContext(OAuthifyContext);
  if (!context) {
    throw new Error('useOAuthify must be used within aOAuthifyProvider');
  }
  return context;
};
