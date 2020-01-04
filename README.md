<p align="center">
  <img alt="tokenpress" src="https://image.flaticon.com/icons/svg/929/929429.svg" width="120">
</p>

<h3 align="center">
  tokenpress
</h3>

<p align="center">
  A JWT utility belt for JavaScript applications
</p>

<p align="center">
  <a href="https://github.com/justinsisley/tokenpress/blob/master/CHANGELOG.md"><img src="https://img.shields.io/github/release/justinsisley/tokenpress.svg?style=for-the-badge" alt="GitHub release" /></a> <a href="https://circleci.com/gh/justinsisley/tokenpress"><img src="https://img.shields.io/circleci/project/github/justinsisley/tokenpress.svg?style=for-the-badge" alt="CircleCI" /></a> <a href="https://github.com/justinsisley/tokenpress/blob/master/LICENSE"><img src="https://img.shields.io/github/license/justinsisley/tokenpress.svg?style=for-the-badge" alt="license" /></a>
</p>

---

# Table of Contents

- [Features](#features)
- [Documentation](#documentation)
  - [Installation](#installation)
  - [Node.js](#nodejs)
  - [Browser](#browser)
  - [Contributing](#contributing)
    - [Linting](#linting)
    - [Testing](#testing)
- [Releases](https://github.com/justinsisley/tokenpress/blob/master/CHANGELOG.md)
- [Credits](#credits)

# Features

- __Convenient, universal utilities for handling JWTs__
- __JWTs generated by [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)__
- __Runs on Node.js v8+__

# Documentation

## Installation

```bash
npm install tokenpress
```

## Node.js

Configure tokenpress before using it:

```javascript
const tokenpress = require('tokenpress');

tokenpress.configure({
  // Required: string or buffer containing the secret for HMAC algorithms
  secret: 'CHANGE_THIS_SECRET',
  // Required: string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
  expiresIn: '30 days',
  // Optional: Minimum and maximum token lengths for getURLSafeToken utility
  minTokenLength: 30,
  maxTokenLength: 50,
});
```

Sign a token:

```javascript
const tokenpress = require('tokenpress');

const token = tokenpress.jwt.sign({
  username: 'clever_username_ftw',
  role: 'USER',
});
```

Verify a token using JWKS:

```javascript
const tokenpress = require('tokenpress');

tokenpress.configure({
  algorithms: ['RS256'],
  audience: 'my audience',
  issuer: `https://my-app.com/`,
  jwksUri: `https://my-app.com/jwks.json`,
});

const someToken = 'blah.blah.blah';
tokenpress.jwt.verifyWithJWKS(someToken).then((decodedJWT) => {
  console.log(decodedJWT)
});
```

Use tokenpress middleware to require authentication for a route:

```javascript
const tokenpress = require('tokenpress');
const { requireAuth } = tokenpress.middleware;

router.get('/user/account', requireAuth, (req, res) => {
  // req.jwt contains the decoded JWT
  const { username, role } = req.jwt;

  res.json({ username, role });
});
```

> Note: If the authentication check fails, a 401 (unauthorized) response will be sent as JSON. The response will contain an `error` property that will equal either `EXPIRED_TOKEN` or `INVALID_TOKEN`. `INVALID_TOKEN` can be caused by any of the conditions listed in the [jsonwebtoken docs](https://github.com/auth0/node-jsonwebtoken#jsonwebtokenerror).

Generate a random, variable-length, hexadecimal string using the crypto.randomBytes function. The minumum length defaults to 30, and the maximum length defaults to 50.

```javascript
const tokenpress = require('tokenpress');

const randomToken = tokenpress.utils.getURLSafeToken();
```

## Browser

Optionally configure whether to use sessionStorage as opposed to localStorage for storing tokens on the client. By default, localStorage will be used.

```javascript
import tokenpress from 'tokenpress/browser';

tokenpress.configure({
  useSessionStorage: true,
});
```

Optionally configure the key used when saving to localStorage or sessionStorage. Defaults to `token`.

```javascript
import tokenpress from 'tokenpress/browser';

tokenpress.configure({
  storageKey: 'custom-token-name',
});
```

Save a token to localStorage/sessionStorage:

```javascript
import tokenpress from 'tokenpress/browser';

mockFunctionToGetTokenFromServer().then((token) => {
  tokenpress.save(token)
});
```

Retrieve a token from localStorage/sessionStorage:

```javascript
import tokenpress from 'tokenpress/browser';

const token = tokenpress.get();
```

Delete a token from localStorage/sessionStorage:

```javascript
import tokenpress from 'tokenpress/browser';

tokenpress.delete();
```

Determine if a token is expired:

```javascript
import tokenpress from 'tokenpress/browser';

// Will fetch token from localStorage/sessionStorage by default
const isTokenExpired = tokenpress.isExpired();
console.log(isTokenExpired); // true or false

// Or, check a token you've previously retrieved
const token = tokenpress.get();
const isMyOtherTokenExpired = tokenpress.isExpired(token);
console.log(isMyOtherTokenExpired); // true or false
```

# Contributing

## Linting

Run ESLint with `npm run lint`.

## Testing

Run unit tests with `npm test`.

# Credits
<div>Icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
