"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var config = {
  storageKey: 'token',
  useSessionStorage: false
};
var storage = 'localStorage';
var tokenpress = {
  configure: function configure(_ref) {
    var storageKey = _ref.storageKey,
        useSessionStorage = _ref.useSessionStorage;
    config = _objectSpread({}, config, {
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
  "delete": function _delete() {
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
