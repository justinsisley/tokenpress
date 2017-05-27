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
  // String or buffer containing the secret for HMAC algorithms
  secret: 'CHANGE_THIS_SECRET',
  // String describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
  expiresIn: '30 days',
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

Generate a random, base64-encoded UUID string containing only URL-safe characters:

```javascript
const { getURLSafeToken } = tokenpress.node.string;

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