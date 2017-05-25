const salt_d = 'a password';
const iterations_d = 1000;
const keylen_d = 69;
const digest_d = 'sha512';
const crypto = require('crypto');

const isSuoprtES6 = process.version.split('.')[0][1]>5;
if (!isSuoprtES6) throw new Error('not suport this version node');

function genPaswd (pasw, salt=salt_d, iterations=iterations_d, keylen=keylen_d, digest=digest_d) {
  return new Promise((resolve, reject) => {
      // crypto.pbkdf2('pasw', 'salt', 100000, 512, 'sha512', (err, key) => {
      crypto.pbkdf2(pasw, salt, iterations, keylen, digest, (err, key) => {
        if (err) reject(new Error(err))
        // console.log(key.toString('hex'))
        resolve(key.toString('hex'))
      });
  })
}


function compare (hashedPsw, pasw, salt=salt_d, iterations=iterations_d, keylen=keylen_d, digest=digest_d) {
  return new Promise((resolve, reject) => {
    genPaswd(pasw, salt, iterations, keylen, digest).then(key => {
      resolve(key.toString('hex') == hashedPsw)
    }).catch(err => reject(new Error(err)));
  })
  
}

module.exports = {
    genPaswd,
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