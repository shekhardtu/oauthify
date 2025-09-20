# OAuthify 🔐

A modern, type-safe, and lightweight OAuth authentication library for React applications. Supports major OAuth providers with full TypeScript support and zero dependencies (except React).

[![npm version](https://img.shields.io/npm/v/oauthify.svg)](https://www.npmjs.com/package/oauthify)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/oauthify)](https://bundlephobia.com/package/oauthify)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## ✨ Features

- 🚀 **Major OAuth Providers** - Pre-built components for Google, GitHub, Microsoft, Facebook, LinkedIn, Apple + support for Discord, Twitter, Spotify, Slack and any OAuth 2.0 provider
- 📦 **Tiny Bundle** - Only 12KB minified (45% smaller than v0.0.32)
- 🔒 **Secure** - PKCE support, state validation, origin checking
- 💪 **Type-Safe** - Full TypeScript support with provider-specific types
- 🎨 **Customizable** - Use pre-built buttons or create your own
- ⚡ **Zero Dependencies** - Only requires React as peer dependency
- 🪟 **Smart Window Management** - Reuses existing auth windows
- 🧹 **Memory Safe** - Automatic cleanup, no memory leaks

## 📦 Installation

```bash
npm install oauthify
# or
yarn add oauthify
# or
pnpm add oauthify
```

## 🚀 Quick Start

### 1. Setup the Provider

Wrap your app with `OAuthifyProvider`:

```tsx
import { OAuthifyProvider } from 'oauthify';

function App() {
  return (
    <OAuthifyProvider>
      {/* Your app components */}
    </OAuthifyProvider>
  );
}
```

### 2. Add the Redirect Handler

Create a redirect page at `/auth/callback` (or your chosen redirect path):

```tsx
// pages/auth/callback.tsx or app/auth/callback/page.tsx
import { OAuthifyRedirect } from 'oauthify';

export default function AuthCallback() {
  return <OAuthifyRedirect />;
}
```

### 3. Use Login Buttons

```tsx
import { GoogleLoginButton, GitHubLoginButton } from 'oauthify';

function LoginPage() {
  const handleSuccess = (response) => {
    console.log('OAuth Code:', response.code);
    // Send code to your backend to exchange for tokens
  };

  const handleError = (error) => {
    console.error('OAuth Error:', error);
  };

  return (
    <div>
      <GoogleLoginButton
        clientId="YOUR_GOOGLE_CLIENT_ID"
        redirectUri="http://localhost:3000/auth/callback"
        onSuccess={handleSuccess}
        onFailure={handleError}
      >
        Sign in with Google
      </GoogleLoginButton>

      <GitHubLoginButton
        clientId="YOUR_GITHUB_CLIENT_ID"
        redirectUri="http://localhost:3000/auth/callback"
        onSuccess={handleSuccess}
        onFailure={handleError}
      />
    </div>
  );
}
```

## 🔑 OAuth Provider Setup

### Getting OAuth Credentials

Each provider requires you to register your application and obtain credentials:

| Provider | Setup Documentation | Required Credentials |
|----------|-------------------|---------------------|
| **Google** | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) | Client ID, Client Secret |
| **GitHub** | [GitHub OAuth Apps](https://github.com/settings/developers) | Client ID, Client Secret |
| **Microsoft** | [Azure App Registration](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) | Application ID, Client Secret, Tenant ID |
| **Facebook** | [Facebook Developers](https://developers.facebook.com/apps) | App ID, App Secret |
| **LinkedIn** | [LinkedIn Developers](https://www.linkedin.com/developers/apps) | Client ID, Client Secret |
| **Apple** | [Apple Developer](https://developer.apple.com/account/resources/identifiers/list/serviceId) | Service ID, Private Key, Team ID |
| **Discord** | [Discord Developers](https://discord.com/developers/applications) | Client ID, Client Secret |
| **Twitter** | [Twitter Developer Portal](https://developer.twitter.com/en/portal/projects-and-apps) | Client ID, Client Secret |
| **Spotify** | [Spotify Dashboard](https://developer.spotify.com/dashboard/applications) | Client ID, Client Secret |
| **Slack** | [Slack API Apps](https://api.slack.com/apps) | Client ID, Client Secret |

### Important Setup Notes

1. **Redirect URI**: Must match exactly in your app configuration and provider settings
2. **HTTPS Required**: Most providers require HTTPS in production (localhost is usually exempt)
3. **Scopes**: Each provider has different available scopes - check their documentation

## 📖 API Reference

### Components

#### `<GoogleLoginButton />`

```tsx
interface GoogleLoginButtonProps {
  clientId: string;
  redirectUri: string;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  scope?: string; // Default: 'openid profile email'
  prompt?: 'none' | 'consent' | 'select_account';
  accessType?: 'online' | 'offline';
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}
```

#### `<GitHubLoginButton />`

```tsx
interface GitHubLoginButtonProps {
  clientId: string;
  redirectUri: string;
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  scope?: string; // Default: 'user:email'
  allowSignup?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}
```

#### `<MicrosoftLoginButton />`

```tsx
interface MicrosoftLoginButtonProps {
  clientId: string;
  redirectUri: string;
  tenant?: string; // Default: 'common'
  onSuccess?: (response: OAuthResponse) => void;
  onFailure?: (error: OAuthError) => void;
  responseMode?: 'query' | 'fragment';
  prompt?: 'login' | 'none' | 'consent' | 'select_account';
  loginHint?: string;
  domainHint?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}
```

#### `<FacebookLoginButton />`, `<LinkedInLoginButton />`, `<AppleLoginButton />`

Similar interfaces with provider-specific options. See TypeScript definitions for full details.

### Hooks

#### `useOAuthify()`

Access the OAuth context and state:

```tsx
const {
  state,           // { loading, success, error, activeProvider }
  setOnSuccess,    // Handle success globally
  setOnFailure,    // Handle failure globally
  setLoading,      // Set loading state
  clearState,      // Clear all state
  clearError       // Clear error state
} = useOAuthify();
```

#### `useOAuthListener(options)`

Listen for OAuth responses:

```tsx
useOAuthListener({
  provider: 'google',  // Optional: filter by provider
  onSuccess: (result) => console.log('Success:', result),
  onError: (error) => console.error('Error:', error)
});
```

### Custom Provider Integration

Use `BaseOAuthButton` with any OAuth 2.0 provider:

```tsx
import { BaseOAuthButton, OAUTH_PROVIDERS } from 'oauthify';

// Use a pre-configured provider
<BaseOAuthButton
  clientId="YOUR_CLIENT_ID"
  redirectUri="YOUR_REDIRECT_URI"
  provider={OAUTH_PROVIDERS.discord}
>
  Sign in with Discord
</BaseOAuthButton>

// Or configure your own
const customProvider = {
  name: 'custom',
  authUrl: 'https://provider.com/oauth/authorize',
  scope: 'read:user',
  additionalParams: {
    custom_param: 'value'
  }
};

<BaseOAuthButton
  clientId="YOUR_CLIENT_ID"
  redirectUri="YOUR_REDIRECT_URI"
  provider={customProvider}
>
  Sign in with Custom Provider
</BaseOAuthButton>
```

## 🔄 Response Handling

### Success Response

```typescript
interface OAuthResponse {
  provider: string;    // 'google' | 'github' | etc.
  code: string;        // Authorization code to exchange for tokens
  state?: string;      // State parameter for CSRF protection
  redirectUri?: string;
}
```

### Error Response

```typescript
interface OAuthError {
  provider: string;
  error: string;
  error_description?: string;
  state?: string;
}
```

## 🛡️ Security Best Practices

1. **Never expose your Client Secret in frontend code**
2. **Always exchange authorization codes for tokens on your backend**
3. **Validate the `state` parameter to prevent CSRF attacks**
4. **Use HTTPS in production**
5. **Implement PKCE for public clients (mobile/SPA)**
6. **Store tokens securely (httpOnly cookies recommended)**

## 🎨 Styling

All buttons accept standard React props and can be styled:

```tsx
<GoogleLoginButton
  className="custom-google-btn"
  style={{ padding: '10px 20px' }}
  // ... other props
>
  <CustomIcon />
  <span>Continue with Google</span>
</GoogleLoginButton>
```

Default CSS classes:
- `.oauth-google-btn`
- `.oauth-github-btn`
- `.oauth-microsoft-btn`
- `.oauth-facebook-btn`
- `.oauth-linkedin-btn`
- `.oauth-apple-btn`

## 🔧 Advanced Usage

### Server-Side Token Exchange

After receiving the authorization code, exchange it for tokens on your backend:

```typescript
// Example Node.js/Express backend
app.post('/auth/callback', async (req, res) => {
  const { code, provider } = req.body;

  // Exchange code for tokens
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  });

  const tokens = await response.json();
  // Store tokens securely and create user session
});
```

### TypeScript Support

OAuthify is built with TypeScript and provides full type definitions:

```typescript
import type {
  OAuthResponse,
  OAuthError,
  GoogleOAuthConfig,
  MicrosoftOAuthConfig
} from 'oauthify';

// Provider-specific configuration
const googleConfig: GoogleOAuthConfig = {
  name: 'google',
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  scope: 'openid profile email',
  accessType: 'offline',
  prompt: 'consent'
};
```

## 📊 Bundle Size Comparison

| Version | Size | Reduction |
|---------|------|-----------|
| v0.0.32 | ~22KB | - |
| v0.0.35 | 12KB | 45% smaller |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

ISC © [shekhardtu](https://github.com/shekhardtu)

## 🙏 Acknowledgments

Built with ❤️ using:
- React
- TypeScript
- Rollup

## 🔗 Links

- [GitHub Repository](https://github.com/shekhardtu/oauthify)
- [NPM Package](https://www.npmjs.com/package/oauthify)
- [Report Issues](https://github.com/shekhardtu/oauthify/issues)