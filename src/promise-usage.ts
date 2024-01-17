// promise用法
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
    reject('error');
  }, 1000);
});

promise.then((res) => {
  console.log('resolveResult: ', res);
}, (err) => {
  console.log('rejectResult: ', err);
});