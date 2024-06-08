// src/index.tsx
import './App.css';
// import App from './App';
import { OAuthifyProvider } from './providers/OAuthify.provider';
import GitHubLoginButton from './components/SocialLogin/Github.component';
import GoogleLoginButton from './components/SocialLogin/Google.component';
import OAuthRedirect from './app/OAuthifyRedirect/index.page';
import GoogleIcon from './components/Icons/GoogleIcon.svg';
import GithubIcon from './components/Icons/GithubIcon.svg';
import { useOAuthify } from './providers/OAuthify.provider';
export {
  OAuthifyProvider,
  GitHubLoginButton,
  GoogleLoginButton,
  OAuthRedirect,
  GoogleIcon,
  GithubIcon,
  useOAuthify,
};
