const jsonwebtoken = require('jsonwebtoken');

const tokenpress = {
  /*
  secret: The secret key used to sign and verify JWTs
  expiresIn: The expiration duration for the JWT in rauchg/ms format
   */
  configure: ({ secret, expiresIn }) => {
    tokenpress._config = {
      secret,
      expiresIn,
    };
  },

  middleware: {
    requireAuth(req, res, next) {
      const failed = () => res.status(401).json({});

      // Allow query parameter auth token, which takes precedence over headers
      const queryToken = req.query.token;
      if (queryToken) {
        // eslint-disable-next-line
        req.headers.authorization = queryToken;
      }

      const token = req.headers.authorization;
      if (!token) {
        return failed();
      }

      return jsonwebtoken.verify(token)
      .then((decodedToken) => {
        // eslint-disable-next-line no-param-reassign
        req.jwt = decodedToken;

        next();
      })
      .catch(failed);
    },
  },

  jwt: {
    sign(payload) {
      const secret = tokenpress._config.secret;
      const expiresIn = tokenpress._config.expiresIn;

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
      const secret = tokenpress._config.secret;

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
};

module.exports = tokenpress;
