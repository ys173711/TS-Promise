import Promise from "./Promise";

let promise = new Promise((resolve, reject) => {
  resolve('success');
  reject('fail');
});

promise.then((res) => {
  console.log('第一个then成功了: ', res);
  return 'ok'
}, (err) => {
  console.log('第一个then失败了: ', err.toString());
  return 'fail'
})
.then((res) => {
  console.log('2: ', res);
  return 'ok2'
}, (err) => {
  console.log('err: ', err);
  return 'fail2'
}).then((res) => {
  console.log('3: ', res);
  return 'ok3'
}, (err) => {
  console.log('err: ', err);
  return 'fail3'
})




export {}