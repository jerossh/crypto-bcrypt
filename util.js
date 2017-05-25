const crypto = require('crypto');
// crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)
var t = Date.now();
crypto.pbkdf2('secret', 'salt112', 1000, 512, 'sha512', (err, key) => {
  if (err) throw err;
  console.log(key.toString('hex'));  // '3745e48...aa39b34'
  console.log(Date.now()-t)
});