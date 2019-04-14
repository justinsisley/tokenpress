const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');

let config = {
  // String or buffer containing the secret for HMAC algorithms
  secret: null,

  // String describing a time span or seconds. Eg: 60, "2 days", "10h", "7d"
  expiresIn: null,

  // Min and max token lengths for getURLSafeToken utility
  minTokenLength: 30,
  maxTokenLength: 50,
};

const tokenpress = {
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

      const failed = error => res.status(401).json({ error });

      // Allow query parameter auth token, which takes precedence over headers
      const queryToken = req.query.token;
      if (queryToken) {
        // eslint-disable-next-line
        req.headers.authorization = queryToken;
      }

      let token = req.headers.authorization;
      if (!token) {
        failed();
        return;
      }

      // Remove "Bearer: " prefix if it exists
      token = token.replace(/^bearer: /i, '');

      jsonwebtoken.verify(token, config.secret, (err, decodedToken) => {
        if (err) {
          switch (err.name) {
            case 'TokenExpiredError':
              failed('EXPIRED_TOKEN');
              return;

            case 'JsonWebTokenError':
              failed('INVALID_TOKEN');
              return;

            default:
              failed(err.name);
              return;
          }
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

      const { secret, expiresIn } = config;

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

      const { secret } = config;

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

  utils: {
    getURLSafeToken() {
      const { maxTokenLength, minTokenLength } = config;

      return new Promise((resolve, reject) => {
        const random = (Math.random() * (maxTokenLength - minTokenLength)) + minTokenLength;
        const length = Math.floor(random);

        crypto.randomBytes(length, (error, buffer) => {
          if (error) {
            return reject(error);
          }

          return resolve(buffer.toString('hex'));
        });
      });
    },
  },
};

module.exports = tokenpress;
