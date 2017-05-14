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

> Note: This library is a very small abstraction on top of [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).

## Quick Start

```bash
npm install -s tokenpress
```

Configure tokenpress before using it:

```javascript
tokenpress.configure({
  secret: 'my_secret',
  expiresIn: 1000 * 60 * 60, // token expiration in ms
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
  // Continuing from the above example...
  const { username, role } = req.jwt;

  res.json({ username, role });
});
```

Icon by [Flaticon](http://www.flaticon.com/)