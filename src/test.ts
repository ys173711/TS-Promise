import Promise from "./Promise";

let promise = new Promise((resolve, reject) => {
  resolve('success');
  reject('error');
});

promise.then((res) => {
  console.log('resolveResult: ', res);
}, (err) => {
  console.log('err: ', err.toString());
});


export {}