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

> Note: This library is a small abstraction on top of [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).

## Quick Start

```bash
npm install -s tokenpress
```

## Node.js usage

Configure tokenpress before using it:

```javascript
tokenpress.configure({
  // a string or buffer containing the secret for HMAC algorithms
  secret: 'CHANGE_THIS_SECRET',
  // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
  expiresIn: '30 days',
});
```

Sign a token:

```javascript
// Simple but dangerous example of issuing a token
router.get('/token/:username', (req, res) => {
  const token = tokenpress.jwt.sign({
    username: req.params.username,
    role: 'USER',
  });

  res.json({ token });
});
```

Use tokenpress middleware to require authentication for a route:

```javascript
const { requireAuth } = tokenpress.middleware;

router.get('/user/account', requireAuth, (req, res) => {
  // User is authenticated
  // req.jwt contains the decoded JWT
  // Continuing from the above example…
  const { username, role } = req.jwt;

  res.json({ username, role });
});
```

## Browser usage

Save a token to localStorage:

```javascript
mockFunctionToGetTokenFromServer().then((token) => {
  tokenpress.localStorage.save(token)
});
```

Retrieve a token from localStorage:

```javascript
const token = tokenpress.localStorage.get();
http.headers.authetication = token;
```

Delete a token from localStorage:

```javascript
const token = tokenpress.localStorage.delete();
console.log(tokenpress.localStorage.get()); // null
```

Icon by [Flaticon](http://www.flaticon.com/)