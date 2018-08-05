"use strict";

var config = {
  // Key used to save the JWT to the browser's localStorage
  localStorageKey: 'token'
};
var tokenpress = {
  browser: {
    configure: function configure(_ref) {
      var localStorageKey = _ref.localStorageKey;
      config = Object.assign({}, config, {
        localStorageKey: localStorageKey
      });
    },
    save: function save(token) {
      window.localStorage.setItem(config.localStorageKey, token);
    },
    get: function get() {
      return window.localStorage.getItem(config.localStorageKey);
    },
    delete: function _delete() {
      window.localStorage.removeItem(config.localStorageKey);
    },
    isExpired: function isExpired() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.localStorage.getItem(config.localStorageKey);

      if (!token) {
        return true;
      }

      var split = token.split('.');

      if (split.length < 3) {
        return true;
      }

      var payload;

      try {
        payload = JSON.parse(window.atob(split[1]));
      } catch (error) {
        /* no-op */
      }

      if (!payload || !payload.exp) {
        return true;
      }

      var expiration = payload.exp;
      var expTimestamp = +"".concat(expiration).padEnd(13, '0');
      var nowTimestamp = Date.now();
      return nowTimestamp > expTimestamp;
    },
    decode: function decode(token) {
      if (!token || !token.split) return null;
      var split = token.split('.');
      if (split.length < 3) return null;
      var payload = null;

      try {
        payload = JSON.parse(window.atob(split[1]));
      } catch (error) {
        /* no-op */
      }

      return payload;
    }
  }
};
module.exports = tokenpress;
