import React, { useEffect, useState } from 'react';
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import GoogleLoginButton from '../SocialLogin/Google.component';
import { useReactOAuth } from 'src/context/ReactOauth.context';
import GitHubLoginButton from '../SocialLogin/Github.component';
import GithubIcon from '../Icons/GithubIcon.svg';
import GoogleIcon from '../Icons/GoogleIcon.svg';

interface AuthCheckProps {
  onClose: () => void;
  orgName?: string;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ orgName = 'MyApp' }) => {
  const { onSuccess, onFailure } = useReactOAuth();
  const handleSuccess = (response: any) => {
    console.log('Login Success from component:', response);
  };

  useEffect(() => {
    if (onSuccess) {
      console.log('Login Success from context:', onSuccess);
    }
  }, [onSuccess]);

  const handleFailure = (error: any) => {
    console.error('Login Failure:', error);
  };

  return (
    <>
      <div className="bg-white px-4 pt-6 mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center my-6">
            <DocumentIcon className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex flex-row justify-center">
            <h3 className="text-lg leading-6 text-gray-900 font-bold mb-2">
              Sign in to {orgName}
            </h3>
          </div>
          <div className="flex flex-row justify-between text-sm text-slate-500">
            Welcome back! Please sign in to your account
          </div>
        </div>
        <div className="flex flex-row justify-center items-center my-6 space-x-2">
          <GoogleLoginButton
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            redirectUri={`${window.location.origin}/oauth-redirect`}
            variant="serverSide"
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
              Sign in with Google
            </div>{' '}
          </GoogleLoginButton>

          <GitHubLoginButton
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            redirectUri={`${window.location.origin}/oauth-redirect`}
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
                <GithubIcon size={16} />{' '}
              </div>{' '}
              Sign in with GitHub
            </div>
          </GitHubLoginButton>
        </div>
      </div>
      <div className="bg-slate-100 px-4 py-3 text-center text-slate-600 text-sm">
        Don't have an account?{' '}
        <span className="cursor-pointer" onClick={() => {}}>
          Sign up
        </span>
      </div>
    </>
  );
};

export default AuthCheck;
