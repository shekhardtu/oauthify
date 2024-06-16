import React, { useEffect, useState } from 'react';

import { useOAuthify } from 'src/providers/OAuthify.provider';
import { OAuthError, OAuthResult } from 'src/types/oauthify';
import CompanyIcon from '../Icons/Company.svg';
import GithubIcon from '../Icons/GithubIcon.svg';
import GoogleIcon from '../Icons/GoogleIcon.svg';
import GitHubLoginButton from '../SocialLogin/Github.component';
import GoogleLoginButton from '../SocialLogin/Google.component';

interface AuthCheckProps {
  onClose: () => void;
  orgName?: string;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ orgName = 'MyApp' }) => {
  const { onSuccess, onFailure } = useOAuthify();
  const redirectUri = `${window.location.origin}/oauthify-redirect`;
  const [formType, setFormType] = useState<
    'signin' | 'signup' | 'forgotPassword'
  >('signin');

  const defaultGoggleClientId = 'googleClientId';
  const defaultGithubClientId = 'githubClientId';

  const googleClientId =
    import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID || defaultGoggleClientId;
  const githubClientId =
    import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_ID || defaultGithubClientId;

  const handleSuccess = (response: OAuthResult) => {
    console.count('Auth success');
  };

  const handleFailure = (error: OAuthError) => {
    console.count('Auth failure');
  };

  useEffect(() => {
console.log('AuthCheck mounted');
  }, [onSuccess]);

  return (
    <>
      <div className="bg-white px-4 pt-6 mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center my-6">
            <CompanyIcon size={40} />
          </div>
          <div className="flex flex-row justify-center">
            <h3 className="text-lg leading-6 text-gray-900 font-bold mb-2">
              {formType === 'signin' ? 'Sign in' : 'Sign up'} to {orgName}
            </h3>
          </div>
          <div className="flex flex-row justify-between text-sm text-slate-500">
            Welcome back! Please {formType === 'signin' ? 'Sign in' : 'Sign up'}{' '}
            to your account
          </div>
        </div>
        <div className="flex flex-row justify-center items-center my-6 space-x-2">
          <GoogleLoginButton
            clientId={googleClientId}
            redirectUri={redirectUri}
            onSuccess={handleSuccess}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: '1px solid #e1e4e8',
                padding: '6px 12px',
                fontSize: '14px',
              }}
            >
              <div className="mr-2">
                {' '}
                <GoogleIcon size={16} />{' '}
              </div>{' '}
              {formType === 'signin' ? 'Sign in' : 'Sign up'} with Google
            </div>{' '}
          </GoogleLoginButton>

          <GitHubLoginButton
            redirectUri={redirectUri}
            clientId={githubClientId}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: '1px solid #e1e4e8',
                padding: '6px 12px',
                fontSize: '14px',
              }}
            >
              <div className="mr-2">
                {' '}
                <GithubIcon size={16} />
              </div>{' '}
              {formType === 'signin' ? 'Sign in' : 'Sign up'} with GitHub
            </div>
          </GitHubLoginButton>
        </div>
      </div>
      <div className="bg-slate-100 px-4 py-3 text-center text-slate-600 text-sm">
        {formType === 'signin'
          ? " Don't have an account?"
          : 'Already have an account?'}{' '}
        <span
          className="cursor-pointer"
          onClick={() => {
            if (formType === 'signin') setFormType('signup');
            if (formType === 'signup') setFormType('signin');
          }}
        >
          {formType === 'signin' ? 'Sign up' : 'Sign in'}
        </span>
      </div>
    </>
  );
};

export default AuthCheck;
