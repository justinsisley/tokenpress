const browser = require('./lib/browser');
const node = require('./lib/node');

it('should export an object', () => {
  expect(typeof browser).toBe('object');
});

it('should allow the localStorage key to be customized', () => {
  const sampleToken = '12345';

  // Save to the default key
  browser.save(sampleToken);

  // Change the key
  browser.configure({
    localStorageKey: 'test-key',
  });

  // No token exists for the new key
  expect(browser.get()).toBe(null);

  // Save under the new key and verify
  browser.save(sampleToken);
  expect(browser.get()).toBe(sampleToken);

  // Cleanup
  browser.delete();
});

it('should save, get, and delete tokens', () => {
  const sampleToken = '12345';

  // Should not exist yet
  expect(browser.get()).toBe(null);

  // Save it and verify it's there
  browser.save(sampleToken);
  expect(browser.get()).toBe(sampleToken);

  // Delete it and verify it's gone
  browser.delete();
  expect(browser.get()).toBe(null);
});

it('should verify if a token has expired', (done) => {
  // Configure with a 1-second expiration
  node.configure({
    secret: 'test',
    expiresIn: 1,
  });

  // Create a new token
  node.jwt.sign({
    username: 'test_username',
  }).then((token) => {
    // Save it to localStorage
    browser.save(token);

    // Make sure it hasn't expired yet
    expect(browser.isExpired()).toBe(false);
    expect(browser.isExpired(token)).toBe(false);

    setTimeout(() => {
    // It should now be expired
      expect(browser.isExpired()).toBe(true);
      expect(browser.isExpired(token)).toBe(true);

      // Cleanup
      browser.delete();

      done();
    }, 1000);
  });
});
