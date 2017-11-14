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

    isExpired() {
      const token = window.localStorage.getItem(config.localStorageKey);
      if (!token) { return true; }

      const split = token.split('.');
      if (split.length < 3) { return true; }

      let payload;
      try { payload = JSON.parse(atob(split[1])); } catch (error) {}
      if (!payload || !payload.exp) { return true; }

      const expiration = payload.exp;

      const expTimestamp = +(`${expiration}`.padEnd(13, '0'));
      const nowTimestamp = Date.now();

      return nowTimestamp > expTimestamp;
    },
  },
};

module.exports = tokenpress;
