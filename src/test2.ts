import Promise from './Promise';

let promise1 = new Promise((resolve, reject) => {
  console.log('promise1的同步区域');
  setTimeout(() => {
    resolve('setTimeout第一个promise');
  }, 5);
});

let promise2 = new Promise((resolve, reject) => {
  console.log('promise2的同步区域');
  setTimeout(() => {
    resolve('setTimeout第二个promise');
    // reject('setTimeout第二个promise');
  }, 5);
});

let promise3 = new Promise((resolve, reject) => {
  console.log('promise3的同步区域');
  setTimeout(() => {
    resolve('setTimeout第三个promise');
  }, 5);
});

Promise.all([promise1, promise2, promise3]).then((res) => {
  console.log('all的then: ', res);
}, (err) => {
  console.log('all的err: ', err);
})

export {}