// src/index.tsx
import './App.css';
// import App from './App';
import { ReactOAuthProvider } from './context/ReactOauth.context';
import GitHubLoginButton from './components/SocialLogin/Github.component';
import GoogleLoginButton from './components/SocialLogin/Google.component';
import OAuthRedirect from './app/OAuthRedirect/index.page';
import GoogleIcon from './components/Icons/GoogleIcon.svg';
import GithubIcon from './components/Icons/GithubIcon.svg';

export {
  ReactOAuthProvider,
  GitHubLoginButton,
  GoogleLoginButton,
  OAuthRedirect,
  GoogleIcon,
  GithubIcon,
};
