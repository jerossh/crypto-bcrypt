const salt_d = 'a password';
const iterations_d = 100;
const keyLength_d = 70;
const digest_d = 'sha512';
const crypto = require('crypto');

var isSupportES6= process.version.split('.')[0][1] > 4;
if (isSupportES6) {console.error('May not suport you node, please upgarde you node version')};

function getPaswd (pasw, salt=salt_d, iterations=iterations_d, keyLength=keyLength_d, digest=digest_d) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(pasw, salt, iterations, keyLength, digest, function(err, key) {
      if (err) reject(new Error('Fail to hash the password'));
      resolve(key);
    })
  })
}

function compare(pasw, hasedKey){
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(pasw, salt, iterations, keyLength, digest, function(err, key) {
      if (err) reject(new Error('Fail to compare the password'));
      resolve(key == hasedKey);
    })
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
    getPaswd,
    compare
}



// function getPaswd (pasw, cb) {
//   const cipher = crypto.createCipher('aes192', pasw);
//   let encrypted = cipher.update(salt, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   cb(encrypted)
// }


// function compare (pasw, hash , cb) {
//   const decipher = crypto.createDecipher('aes192', pasw);
//   const encrypted = hash;
//   let isMatch = false
//   let err = null
//   try {
//     let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');

//     if (decrypted === salt) {
//       isMatch = true
//     } else {
//       isMatch = false
//     }

//   } catch (e) {
//     console.log(e);
//     isMatch = false
//     err = new Error(e);
//   }

//   cb(err, isMatch)
// }