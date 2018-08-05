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
  <img src="https://img.shields.io/github/release/justinsisley/tokenpress.svg?style=for-the-badge" alt="GitHub release" /> <img src="https://img.shields.io/circleci/project/github/justinsisley/tokenpress.svg?style=for-the-badge" alt="CircleCI" /> <img src="https://img.shields.io/github/license/justinsisley/tokenpress.svg?style=for-the-badge" alt="license" />
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

Optionally configure the key used when saving to localStorage. Defaults to `token`.

```javascript
import tokenpress from 'tokenpress/browser';

tokenpress.configure({
  localStorageKey: 'custom-token-name',
});
```

Save a token to localStorage:

```javascript
import tokenpress from 'tokenpress/browser';

mockFunctionToGetTokenFromServer().then((token) => {
  tokenpress.save(token)
});
```

Retrieve a token from localStorage:

```javascript
import tokenpress from 'tokenpress/browser';

const token = tokenpress.get();
```

Delete a token from localStorage:

```javascript
import tokenpress from 'tokenpress/browser';

tokenpress.delete();
```

Determine if a token is expired:

```javascript
import tokenpress from 'tokenpress/browser';

// Will fetch token from localStorage by default
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