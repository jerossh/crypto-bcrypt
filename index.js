const salt = 'a password';
const crypto = require('crypto');

function getPaswd (pasw, cb) {
  const cipher = crypto.createCipher('aes192', pasw);
  let encrypted = cipher.update(salt, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  cb(encrypted)
}


function compare (pasw, hash , cb) {
  const decipher = crypto.createDecipher('aes192', pasw);
  const encrypted = hash;
  let isMatch = false
  let err = null
  try {
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    if (decrypted === salt) {
      isMatch = true
    } else {
      isMatch = false
    }

  } catch (e) {
    console.log(e);
    isMatch = false
    err = new Error(e);
  }

  cb(err, isMatch)
}

module.exports = {
    getPaswd,
    compare
}
