### Authify

### Installation

To install the package, run:

```bash
npm install authify
```

### Usage

#### GoogleLoginButton

To use the Google login button:

1. **Import and use the `GoogleLoginButton` component in your React application:**

```javascript
import React from 'react';
import GoogleLoginButton from 'authify/GoogleLoginButton';

const App = () => {
  const handleSuccess = (response) => {
    console.log('Google login success:', response);
  };

  const handleFailure = (error) => {
    console.error('Google login failure:', error);
  };

  return (
    <div>
      <GoogleLoginButton
        googleClientId="YOUR_GOOGLE_CLIENT_ID"
        redirectUri="{base_url}/oauth-redirect"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        variant="custom" // or "renderedButton"
      >
        Login with Google
      </GoogleLoginButton>
    </div>
  );
};

export default App;
```

2. **Add a redirect page to handle the OAuth callback:**

Create `public/oauth-redirect.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>OAuth Redirect</title>
    <link rel="stylesheet" href="/path/to/your/styles.css" />
  </head>
  <body>
    <div id="root">Redirecting...</div>
    <script>
      window.onload = function () {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (code) {
          window.opener.postMessage({ code }, window.location.origin);
        } else if (error) {
          window.opener.postMessage({ error }, window.location.origin);
        }

        window.close();
      };
    </script>
  </body>
</html>
```

#### GitHubLoginButton

To use the GitHub login button:

1. **Import and use the `GitHubLoginButton` component in your React application:**

```javascript
import React from 'react';
import GitHubLoginButton from 'authify/GitHubLoginButton';

const App = () => {
  const handleSuccess = (response) => {
    console.log('GitHub login success:', response);
  };

  const handleFailure = (error) => {
    console.error('GitHub login failure:', error);
  };

  return (
    <div>
      <GitHubLoginButton
        githubClientId="YOUR_GITHUB_CLIENT_ID"
        redirectUri="http://localhost:3000/oauth-redirect"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        variant="custom" // or "renderedButton"
      >
        Login with GitHub
      </GitHubLoginButton>
    </div>
  );
};

export default App;
```

2. **Add the same redirect page for handling OAuth callback as described for GoogleLoginButton.**

### Contributions

We welcome contributions! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

We encourage contributions for adding support for other providers, improving documentation, and fixing bugs. If you find this project helpful, please give it a star on GitHub to help others discover it!
