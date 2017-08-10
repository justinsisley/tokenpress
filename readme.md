<p align="center">
  <img alt="tokenpress" src="https://image.flaticon.com/icons/svg/105/105249.svg" width="144">
</p>

<h3 align="center">
  tokenpress
</h3>

<p align="center">
  An Express.js JWT Helper Library
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tokenpress"><img src="https://img.shields.io/npm/v/tokenpress.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/tokenpress"><img src="https://img.shields.io/npm/dm/tokenpress.svg?style=flat-square"></a>
</p>

## Quick Start

```bash
npm install -s tokenpress
```

## Node.js usage

Configure tokenpress before using it:

```javascript
tokenpress.node.configure({
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
const { jwt } = tokenpress.node;

// Simple but dangerous example of issuing a token
router.get('/token/:username', (req, res) => {
  const token = jwt.sign({
    username: req.params.username,
    role: 'USER',
  });

  res.json({ token });
});
```

Use tokenpress middleware to require authentication for a route:

> Note: If the authentication check fails, a 401 (unauthorized) response will be sent as JSON. The response will contain an `error` property that will equal either `EXPIRED_TOKEN` or `INVALID_TOKEN`. `INVALID_TOKEN` can be caused by any of the conditions listed in the [jsonwebtoken docs](https://github.com/auth0/node-jsonwebtoken#jsonwebtokenerror).

```javascript
const { requireAuth } = tokenpress.node.middleware;

router.get('/user/account', requireAuth, (req, res) => {
  // User is authenticated
  // req.jwt contains the decoded JWT
  // Continuing from the above example…
  const { username, role } = req.jwt;

  res.json({ username, role });
});
```

Generate a random, variable-length, hexadecimal string using the crypto.randomBytes function. The minumum length defaults to 30, and the maximum length defaults to 50.

```javascript
const { getURLSafeToken } = tokenpress.node.utils;

router.get('/randomToken', (req, res) => {
  const token = getURLSafeToken();

  res.json({ token });
});
```

## Browser usage

Optionally configure the key used when saving to localStorage. Defaults to `token`.

```javascript
import tokenpress from 'tokenpress/browser';

tokenpress.browser.configure({
  localStorageKey: 'custom-token-name',
});
```

Save a token to localStorage:

```javascript
import tokenpress from 'tokenpress/browser';

mockFunctionToGetTokenFromServer().then((token) => {
  tokenpress.browser.save(token)
});
```

Retrieve a token from localStorage:

```javascript
import tokenpress from 'tokenpress/browser';

const token = tokenpress.browser.get();
http.headers.authentication = token;
```

Delete a token from localStorage:

```javascript
import tokenpress from 'tokenpress/browser';

const token = tokenpress.browser.delete();
console.log(tokenpress.browser.get()); // null
```

## Credits

- Depends on [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- Icon by [Flaticon](http://www.flaticon.com/)