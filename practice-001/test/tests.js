const assert = require('assert');
assert.throws(
  () => {
    const otherErr = new Error('Not found');
    otherErr.code = 404;
    throw otherErr;
  }
);