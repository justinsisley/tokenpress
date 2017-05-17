'use strict';

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
    }
  }
};

module.exports = tokenpress;
