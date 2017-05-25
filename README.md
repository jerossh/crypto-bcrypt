基于 crypto 模块开发的用户注册登录插件

# crypto-bctypt

hash the password  for sign in && hash password for sign up/ 注册密码加密，登录密码比对

## Installation

```bash
npm install crypto-bctypt --save
```

## Usage 

sign up／ 注册

```js
genPaswd(user1.psw).then(hash => {
  // save the hash
}).catch(err => deal(err))

```

sign in  ／ 登录

```js
compare(hash, user1.psw).then( bool => {
  if (bool) {
    // just to sigin in}
  else {
    // may your pswd is wrong
  }
}).catch(err=> deal(err))

```


## param

genPaswd(pasw, salt, iterations, keylen, digest)

compare(hashedPsw, pasw, salt, iterations, keylen digest)

```js
// default
genPaswd(user1.pasw, 'a password', 1000, 69, 'sha512')
// default
compare(hash, user1.psw);


// custom 
const customSalt = 'custom'
enPaswd(user1.pasw, customSalt)
// compare need custom too
compare(hash, user1.psw, customSalt);

```




