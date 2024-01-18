import Promise from "./Promise";

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功了');
    reject('失败了');
  }, 5);
});

promise.then((res) => {
  console.log('第1个then成功了: ', res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('第2个异步操作...');
    }, 5);
  })
}, (err) => {
  console.log('第1个then失败了: ', err.toString());
  return 'fail'
})
.then((res) => {
  console.log('第2个then成功了: ', res);
  return 'ok2'
}, (err) => {
  console.log('第2个then失败了: ', err);
  return 'fail2'
})
.then((res) => {
  console.log('第3个then成功了: ', res);
  return 'ok3'
}, (err) => {
  console.log('第3个then失败了: ', err);
  return 'fail3'
})

console.log('end!')

export {}