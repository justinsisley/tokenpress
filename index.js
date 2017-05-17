const jsonwebtoken = require('jsonwebtoken');

let config = {
  // String or buffer containing the secret for HMAC algorithms
  secret: null,
  // String describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
  expiresIn: null,
  // Key used to save the JWT to the browser's localStorage
  localStorageKey: 'token',
};

const tokenpress = {
  node: {
    configure: ({ secret, expiresIn }) => {
      config = Object.assign({}, config, {
        secret,
        expiresIn,
      });
    },

    middleware: {
      requireAuth(req, res, next) {
        if (!config.secret) {
          throw new Error('missing tokenpress secret');
        }

        const failed = () => res.status(401).json({});

        // Allow query parameter auth token, which takes precedence over headers
        const queryToken = req.query.token;
        if (queryToken) {
          // eslint-disable-next-line
          req.headers.authorization = queryToken;
        }

        const token = req.headers.authorization;
        if (!token) {
          failed();
          return;
        }

        jsonwebtoken.verify(token, config.secret, (err, decodedToken) => {
          if (err) {
            failed();
            return;
          }

          // eslint-disable-next-line no-param-reassign
          req.jwt = decodedToken;

          next();
        });
      },
    },

    jwt: {
      sign(payload) {
        if (!config.secret) {
          throw new Error('missing tokenpress secret');
        }

        if (!config.expiresIn) {
          throw new Error('missing tokenpress expiresIn');
        }

        const secret = config.secret;
        const expiresIn = config.expiresIn;

        return new Promise((resolve, reject) => {
          jsonwebtoken.sign(payload, secret, { expiresIn }, (err, token) => {
            if (err) {
              return reject(err);
            }

            return resolve(token);
          });
        });
      },

      verify(token) {
        if (!config.secret) {
          throw new Error('missing tokenpress secret');
        }

        const secret = config.secret;

        return new Promise((resolve, reject) => {
          jsonwebtoken.verify(token, secret, (err, decoded) => {
            if (err) {
              return reject(err);
            }

            return resolve(decoded);
          });
        });
      },
    },
  },

  browser: {
    configure: ({ localStorageKey }) => {
      config = Object.assign({}, config, {
        localStorageKey,
      });
    },

    save(token) {
      window.localStorage.setItem(config.localStorageKey, token);
    },

    get() {
      return window.localStorage.getItem(config.localStorageKey);
    },

    delete() {
      window.localStorage.removeItem(config.localStorageKey);
    },
  },
};

module.exports = tokenpress;
