const { genPaswd, compare } = require('../');
const user1 = {
  name: 'tj',
  psw: 'qwe123'
}

// 注册，产生密码
genPaswd(user1.psw).then(hash => {

// 登陆 比对密码
compare(hash, user1.psw).then( bool => {
  return console.log('密码比对结果：',bool)
}).catch(err=> console.log('发生了错误：', err))

})




// just node index to test.