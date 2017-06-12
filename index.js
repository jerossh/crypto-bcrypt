const salt_d = 'a password';
const iterations_d = 100;
const keylen_d = 70;
const digest_d = 'sha512';
const crypto = require('crypto');

var isSupportES6= process.version.split('.')[0][1] > 4;
if (!isSupportES6) {console.error('May not suport you node, please upgarde you node version')};


function genPaswd(pasw, salt=salt_d, iterations=iterations_d, keylen=keylen_d, digest=digest_d) {
  return new Promise((resolve, reject) => {
      // crypto.pbkdf2('pasw', 'salt', 100000, 512, 'sha512', (err, key) => {
      crypto.pbkdf2(pasw, salt, iterations, keylen, digest, (err, key) => {
        if (typeof pasw !== 'string') {
          reject(new TypeError('Expect text format'));
        }
        if (err) reject(new Error(err))
        // console.log(key.toString('hex'))
        resolve(key.toString('hex'))
      });
  })
}


function compare(hashedPsw, pasw, salt=salt_d, iterations=iterations_d, keylen=keylen_d, digest=digest_d) {

  return new Promise((resolve, reject) => {
    if (typeof hashedPsw !== 'string' || typeof pasw !== 'string') {
      reject(new TypeError('Expect text format'))
    }
    genPaswd(pasw, salt, iterations, keylen, digest).then(key => {
      resolve(key.toString('hex') == hashedPsw)
    }).catch(err => reject(new Error(err)));
  })
}


/**
   * Generates a new hash using the password and the salt
   *
   *  The callback will be called with the following arguments:
   *   - the error, if something when wrong.
   *   - the password.
   *   - the salt, encoded in base64.
   *   - the hash, encoded in base64.
   *
   * @api private
   * @param {Object} opts The options used to generate the hash (password & salt)
   * @param {Function} cb The callback
   */


// function genHashWithDigest(opts, cb) {
//   crypto.pbkdf2(pasw, salt, iterations, keyLength, digest, function(err, hash) {
//     if (typeof hash === 'string') {
//       hash = new Buffer(hash, 'binary');
//     }

//     cb(err, opts.password, opts.salt.toString("base64"), hash.toString("base64"));
//   });
// }



module.exports = {
    genPaswd,
    compare
}
