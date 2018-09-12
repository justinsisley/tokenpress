"use strict";

var config = {
  storageKey: 'token',
  useSessionStorage: false
};
var storage = 'localStorage';
var tokenpress = {
  configure: function configure(_ref) {
    var storageKey = _ref.storageKey,
        useSessionStorage = _ref.useSessionStorage;
    config = Object.assign({}, config, {
      storageKey: storageKey
    });

    if (useSessionStorage) {
      storage = 'sessionStorage';
    }
  },
  save: function save(token) {
    window[storage].setItem(config.storageKey, token);
  },
  get: function get() {
    return window[storage].getItem(config.storageKey);
  },
  delete: function _delete() {
    window[storage].removeItem(config.storageKey);
  },
  isExpired: function isExpired() {
    var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window[storage].getItem(config.storageKey);

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
};
module.exports = tokenpress;
