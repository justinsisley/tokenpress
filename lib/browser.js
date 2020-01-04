let config = {
  storageKey: 'token',
  useSessionStorage: false,
};

let storage = 'localStorage';

const tokenpress = {
  configure: ({
    storageKey,
    useSessionStorage,
  }) => {
    config = { ...config, storageKey };

    if (useSessionStorage) {
      storage = 'sessionStorage';
    }
  },

  save(token) {
    window[storage].setItem(config.storageKey, token);
  },

  get() {
    return window[storage].getItem(config.storageKey);
  },

  delete() {
    window[storage].removeItem(config.storageKey);
  },

  isExpired(token = window[storage].getItem(config.storageKey)) {
    if (!token) { return true; }

    const split = token.split('.');
    if (split.length < 3) { return true; }

    let payload;
    try {
      payload = JSON.parse(window.atob(split[1]));
    } catch (error) { /* no-op */ }

    if (!payload || !payload.exp) { return true; }

    const expiration = payload.exp;

    const expTimestamp = +(`${expiration}`.padEnd(13, '0'));
    const nowTimestamp = Date.now();

    return nowTimestamp > expTimestamp;
  },

  decode(token) {
    if (!token || !token.split) return null;

    const split = token.split('.');
    if (split.length < 3) return null;

    let payload = null;
    try {
      payload = JSON.parse(window.atob(split[1]));
    } catch (error) { /* no-op */ }

    return payload;
  },
};

module.exports = tokenpress;
