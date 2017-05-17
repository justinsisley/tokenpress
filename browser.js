let config = {
  // Key used to save the JWT to the browser's localStorage
  localStorageKey: 'token',
};

const tokenpress = {
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
